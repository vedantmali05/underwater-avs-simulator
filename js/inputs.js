// Imports
import { createDialog, createSnackbar, removeInputMsg } from "./components/utils.js"
import { allowNumberInputOnly, validateInput, validateToggleInputs } from "./components/utils.js"
import { toTwoDigit } from "./components/utils.js"
import { TIME_WEEK_DAYS, TIME_MONTHS } from "./components/data.js";

// Dummy Input History Data <to be Removed later>
let INPUT_HISTORY = [
    {
        targetStrength: 1,
        noiseSourceFrequency: 2000,
        signalDuration: 1.2,
        samplingRate: 3,
        avs1X: 10,
        avs1Y: 25,
        avs2X: 32,
        avs2Y: 17,
        targetX: 15,
        targetY: 22,
        seastate: 1,
        recordTime: 1818960001371,
    },
    {
        targetStrength: 2,
        noiseSourceFrequency: 3500,
        signalDuration: 0.8,
        samplingRate: 3,
        avs1X: 8,
        avs1Y: 30,
        avs2X: 27,
        avs2Y: 19,
        targetX: 12,
        targetY: 24,
        seastate: 1,
        recordTime: 1718960001372,
    },
    {
        targetStrength: 3,
        noiseSourceFrequency: 1500,
        signalDuration: 2.1,
        samplingRate: 3,
        avs1X: 14,
        avs1Y: 18,
        avs2X: 39,
        avs2Y: 12,
        targetX: 18,
        targetY: 20,
        seastate: 1,
        recordTime: 1718960001373,
    },
    {
        targetStrength: 4,
        noiseSourceFrequency: 2800,
        signalDuration: 0.9,
        samplingRate: 3,
        avs1X: 5,
        avs1Y: 35,
        avs2X: 24,
        avs2Y: 21,
        targetX: 10,
        targetY: 28,
        seastate: 1,
        recordTime: 1718960001374,
    },
    {
        targetStrength: 5,
        noiseSourceFrequency: 1800,
        signalDuration: 1.5,
        samplingRate: 3,
        avs1X: 3,
        avs1Y: 40,
        avs2X: 21,
        avs2Y: 15,
        targetX: 7,
        targetY: 32,
        seastate: 1,
        recordTime: 1718960901375,
    },
];


/* ///////////////
    HELPER FUNCTIONS
/////////////// */

// FUNCTION to populate the recent inputs
function populateInputHistory(inputHistorySec, INPUT_HISTORY, formInputsSet, seastateToggleInput) {
    if (!inputHistorySec) { return } else { inputHistorySec.innerHTML = ``; inputHistorySec.scrollIntoView({ behavior: 'smooth' }) }

    // If no History Available
    if (!INPUT_HISTORY || INPUT_HISTORY.length == 0) {
        inputHistorySec.innerHTML = `<p class="center">No History available. Enter data to the fields will add it to this list for reuse when "Calculate" button is clicked.</p>`;
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

            for (const [inputName, inputElem] of Object.entries(formInputsSet)) {
                inputElem.value = selectedData[inputName.slice(0, -5)];
            }

            seastateToggleInput.forEach(radio => {
                if (selectedData.seastate == +radio.value) {
                    radio.checked = true;
                }
            })

            INPUT_HISTORY.unshift(selectedData);
            populateInputHistory(inputHistorySec, INPUT_HISTORY, formInputsSet, seastateToggleInput);
        });
    })
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

            let inputData = {};

            for (const [inputName, inputElem] of Object.entries(formInputsSet)) {
                inputData[inputName.slice(0, -5)] = inputElem.value;
                removeInputMsg(inputElem);
            }

            seastateToggleInput.forEach(radio => {
                if (radio.checked) {
                    inputData.seastate = radio.value;
                }
            })
            removeInputMsg(seastateToggleInput);
            inputData.recordTime = new Date().getTime();

            INPUT_HISTORY.unshift(inputData)

            populateInputHistory(inputHistorySec, INPUT_HISTORY, formInputsSet, seastateToggleInput);

            // Pass
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

    let inputHistorySec = document.getElementById("input_history_box");

    populateInputHistory(inputHistorySec, INPUT_HISTORY, formInputsSet, seastateToggleInput);

})
