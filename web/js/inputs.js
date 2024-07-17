// Imports
import { createDialog, removeInputMsg } from "./components/utils.js"
import { allowNumberInputOnly, validateInput, validateToggleInputs } from "./components/utils.js"
import { toTwoDigit } from "./components/utils.js"
import { TIME_MONTHS } from "./components/data.js";

/* ///////////////
    HELPER FUNCTIONS
/////////////// */

// FUNCTION to populate the recent inputs
function populateInputHistory(inputHistorySec, INPUT_HISTORY, formInputsSet, seastateToggleInput) {
    if (!inputHistorySec) { return } else { inputHistorySec.innerHTML = ``; inputHistorySec.scrollIntoView({ behavior: 'smooth' }) }
    // If no History Available
    if (!INPUT_HISTORY || INPUT_HISTORY.length == 0) {
        inputHistorySec.innerHTML = `<p class="center empty-sec">No History available. Input data will be added to this list for reuse when "Calculate" button is clicked.</p>`;
        return;
    }

    INPUT_HISTORY.forEach(elem => {
        let date = new Date(elem.recordTime);
        let hours = date.getHours();
        let meridian = hours >= 12 ? "PM" : "AM";


        let tableContainer = document.createElement("div");
        tableContainer.classList.add("table-container")
        tableContainer.innerHTML =
            `
        <table>
        <caption>${toTwoDigit(date.getDate())} ${TIME_MONTHS[date.getMonth()].slice(0, 3)} ${date.getFullYear()}, ${toTwoDigit(hours % 12 || hours)}:${toTwoDigit(date.getMinutes())} ${meridian}</caption>
        <tbody>
        <tr>
            <td>Target Strength</td>
            <td colspan="2">${elem.targetStrength} <span class="fs-300">dBre1V/µPa</span></td>
        </tr>
        <tr>
            <td>Noise Source Frequency</td>
            <td colspan="2">${elem.noiseSourceFrequency} <span class="fs-300">Hz</span></td>
        </tr>
        <tr>
            <td>Signal Duration</td>
            <td colspan="2">${elem.signalDuration} <span class="fs-300">Seconds</span></td>
        </tr>
        <tr>
            <td>Sampling Rate</td>
            <td colspan="2">${elem.samplingRate} <span class="fs-300">Samples/Sec</span></td>
        </tr>
        <tr>
            <td>Seastate</td>
            <td colspan="2">${elem.seastate} <span class="fs-300">Seastate</span></td>
        </tr>
        <tr>
            <td>AVS-1</td>
            <td>${elem.avs1X} <span class="fs-300">X(m)</span></td>
            <td>${elem.avs1Y} <span class="fs-300">Y(m)</span></td>
        </tr>
        <tr>
            <td>AVS-2</td>
            <td>${elem.avs2X} <span class="fs-300">X(m)</span></td>
            <td>${elem.avs2Y} <span class="fs-300">Y(m)</span></td>
        </tr>
        <tr>
            <td>Target</td>
            <td>${elem.targetX} <span class="fs-300">X(m)</span></td>
            <td>${elem.targetY} <span class="fs-300">Y(m)</span></td>
        </tr>
        <tr>
            <td colspan="3"><button class="primary input-history-select-btn">Select</button></td>
        </tr>
        </tbody>
        </table>
        `;

        inputHistorySec.append(tableContainer);
    });

    let inputHistorySelectBtnsArr = document.querySelectorAll(".input-history-select-btn");

    inputHistorySelectBtnsArr.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            let selectedData = INPUT_HISTORY.splice(i, 1)[0];

            selectedData.recordTime = new Date().getTime();

            eel.updateInputHistory(selectedData);
            eel.saveToJSONFile("inputs.json", selectedData);
            repopulateInputHistory(formInputsSet, seastateToggleInput);

            for (const [inputName, inputElem] of Object.entries(formInputsSet)) {
                inputElem.value = selectedData[inputName.slice(0, -5)];
            }

            seastateToggleInput.forEach(radio => {
                if (selectedData.seastate == +radio.value) {
                    radio.checked = true;
                }
            })
            if (window.innerWidth < 1024) {
                document.querySelector(".input-aside-close-btn").click();
            }
        });
    })
}

// FUNCTION to RE-POPULATE Input History on UI
function repopulateInputHistory(formInputsSet, seastateToggleInput) {
    eel.getFromJSONFile("inputs-history.json")()
        .then((data) => {
            let inputHistorySec = document.getElementById("input_history_box");
            populateInputHistory(inputHistorySec, data, formInputsSet, seastateToggleInput);
        });
}

// Main Code
document.addEventListener('DOMContentLoaded', () => {

    // ALL INPUTS in the Forms
    let formInputsSet = {
        targetStrengthInput: document.getElementById("target_strength"),
        noiseSourceFrequencyInput: document.getElementById("noise_source_frequency"),
        signalDurationInput: document.getElementById("signal_duration"),
        samplingRateInput: document.getElementById("sampling_rate"),
        avs1XInput: document.getElementById("avs_1_x"),
        avs1YInput: document.getElementById("avs_1_y"),
        avs2XInput: document.getElementById("avs_2_x"),
        avs2YInput: document.getElementById("avs_2_y"),
        targetXInput: document.getElementById("target_x"),
        targetYInput: document.getElementById("target_y"),
    }

    // Toggle Inputs (Radio buttons) of the form
    let seastateToggleInput = document.querySelectorAll("[name='seastate']");

    // Form Buttons
    let clearFormBtn = document.getElementById("clear_form_btn");
    let calculateBtn = document.getElementById("calculate_btn");

    // Convert input type text to number manually
    for (let [inputName, inputElem] of Object.entries(formInputsSet)) {
        allowNumberInputOnly(inputElem);
    }

    // ON Calculate Button Clicked
    calculateBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Validate all Inputs
        let validationArray = [];
        for (let [inputName, inputElem] of Object.entries(formInputsSet)) {
            let msg = inputElem.getAttribute("data-msg");
            validateInput(inputElem, msg)
        }
        validationArray.push(validateToggleInputs(seastateToggleInput, "Please choose a seastate"));

        // Is everything is okay,
        if (!validationArray.includes(false)) {

            let INPUT_DATA = {};

            for (const [inputName, inputElem] of Object.entries(formInputsSet)) {
                INPUT_DATA[inputName.slice(0, -5)] = Number(inputElem.value);
                removeInputMsg(inputElem);
            }

            seastateToggleInput.forEach(radio => {
                if (radio.checked) {
                    INPUT_DATA.seastate = Number(radio.value);
                }
            })
            removeInputMsg(seastateToggleInput[0]);
            INPUT_DATA.recordTime = new Date().getTime();

            // Save data to db
            eel.saveToJSONFile("inputs.json", INPUT_DATA);
            eel.updateInputHistory(INPUT_DATA);
            window.location.href = "./avs-calculations.html"
        }

    });

    // Clearing the input data from the form
    clearFormBtn?.addEventListener("click", function (e) {
        e.preventDefault();

        // Popup Dialog and ask user for confirmation
        createDialog({
            headline: "Reset all inputs?",
            description: "Are you sure want to clear all the inputs given? This action cannot be undone.",
            primaryBtnLabel: "Clear",
            secondaryBtnLabel: "Keep",
            primaryAction: () => {
                // If clear clicked, clear the inputs
                document.getElementById("hidden_clear_form_btn")?.click();

                for (const [inputName, inputElem] of Object.entries(formInputsSet)) {
                    removeInputMsg(inputElem);
                }

                removeInputMsg(seastateToggleInput[0]);

                return true;
            },
            danger: true
        })

    });



    /* ///////////////
    INPUT HISTORY
    /////////////// */

    // Populate Input History
    repopulateInputHistory(formInputsSet, seastateToggleInput);


    // clear all input history
    let clearInputHistoryBtn = document.getElementById("clear_input_history_btn");

    clearInputHistoryBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // Popup Dialog and ask user for confirmation
        createDialog({
            headline: "Clear all History",
            description: "Are you sure want to clear all the saved input data history? This action cannot be undone.",
            primaryBtnLabel: "Clear",
            secondaryBtnLabel: "Keep",
            primaryAction: () => {
                // If clear clicked, clear the inputs
                // Clear Inputs
                eel.updateInputHistory([]);
                repopulateInputHistory(formInputsSet, seastateToggleInput);
                return true;
            },
            danger: true
        })


    })
})
