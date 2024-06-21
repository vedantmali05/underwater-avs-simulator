// Imports
import { createDialog, createSnackbar } from "./components/utils.js"
import { allowNumberInputOnly, validateInput, validateToggleInputs } from "./components/utils.js"
import { toTwoDigit } from "./components/utils.js"
import { TIME_WEEK_DAYS, TIME_MONTHS } from "./components/data.js";

// Dummy Input History Data <to be Removed later>
const INPUT_HISTORY = [
    {
        recordTime: 1818960001371,
        targetStrength: 1,
        noiseSourceFrequency: 2000,
        signalDuration: 1.2,
        seastate: 1,
        avs1X: 10,
        avs1Y: 25,
        avs2X: 32,
        avs2Y: 17,
        targetX: 15,
        targetY: 22,
    },
    {
        recordTime: 1718960001372,
        targetStrength: 2,
        noiseSourceFrequency: 3500,
        signalDuration: 0.8,
        seastate: 1,
        avs1X: 8,
        avs1Y: 30,
        avs2X: 27,
        avs2Y: 19,
        targetX: 12,
        targetY: 24,
    },
    {
        recordTime: 1718960001373,
        targetStrength: 3,
        noiseSourceFrequency: 1500,
        signalDuration: 2.1,
        seastate: 1,
        avs1X: 14,
        avs1Y: 18,
        avs2X: 39,
        avs2Y: 12,
        targetX: 18,
        targetY: 20,
    },
    {
        recordTime: 1718960001374,
        targetStrength: 4,
        noiseSourceFrequency: 2800,
        signalDuration: 0.9,
        seastate: 1,
        avs1X: 5,
        avs1Y: 35,
        avs2X: 24,
        avs2Y: 21,
        targetX: 10,
        targetY: 28,
    },
    {
        recordTime: 1718960901375,
        targetStrength: 5,
        noiseSourceFrequency: 1800,
        signalDuration: 1.5,
        seastate: 1,
        avs1X: 3,
        avs1Y: 40,
        avs2X: 21,
        avs2Y: 15,
        targetX: 7,
        targetY: 32,
    },
];


/* ///////////////
    HELPER FUNCTIONS
/////////////// */

// FUNCTION to populate the recent inputs
function populateInputHistory(inputHistorySec, INPUT_HISTORY, inputCollection) {
    if (!inputHistorySec) { return } else { inputHistorySec.innerHTML = `` }

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
            <td>Seastate</td>
            <td colspan="2">${elem.seastate} <span class="fs-300">Seastate</span></td>
        </tr>
        <tr>
            <td>AVS-1</td>
            <td>${elem.avs1X} <span class="fs-300">X</span></td>
            <td>${elem.avs1Y} <span class="fs-300">Y</span></td>
        </tr>
        <tr>
            <td>AVS-2</td>
            <td>${elem.avs2X} <span class="fs-300">X</span></td>
            <td>${elem.avs2Y} <span class="fs-300">Y</span></td>
        </tr>
        <tr>
            <td>Target</td>
            <td>${elem.targetX} <span class="fs-300">X</span></td>
            <td>${elem.targetY} <span class="fs-300">Y</span></td>
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

            inputCollection.targetStrengthInput.value = selectedData.targetStrength;
            inputCollection.noiseSourceFrequencyInput.value = selectedData.noiseSourceFrequency;
            inputCollection.signalDurationInput.value = selectedData.signalDuration;
            inputCollection.avs1XInput.value = selectedData.avs1X;
            inputCollection.avs1YInput.value = selectedData.avs1Y;
            inputCollection.avs2XInput.value = selectedData.avs2X;
            inputCollection.avs2YInput.value = selectedData.avs2Y;
            inputCollection.targetXInput.value = selectedData.targetX;
            inputCollection.targetYInput.value = selectedData.targetY;

            inputCollection.seastateToggleInput.forEach(radio => {
                if (selectedData.seastate == +radio.value) {
                    radio.checked = true;
                }
            })

            INPUT_HISTORY.unshift(selectedData);
            populateInputHistory(inputHistorySec, INPUT_HISTORY, inputCollection);
        });
    })
}

// Main Code
document.addEventListener('DOMContentLoaded', () => {

    // Access all input tags
    let targetStrengthInput = document.getElementById("target_strength");
    let noiseSourceFrequencyInput = document.getElementById("noise_source_frequency");
    let signalDurationInput = document.getElementById("signal_duration");
    let avs1XInput = document.getElementById("avs_1_x");
    let avs1YInput = document.getElementById("avs_1_y");
    let avs2XInput = document.getElementById("avs_2_x");
    let avs2YInput = document.getElementById("avs_2_y");
    let targetXInput = document.getElementById("target_x");
    let targetYInput = document.getElementById("target_y");
    // Access radio buttons by name attr
    let seastateToggleInput = document.querySelectorAll("[name='seastate']");
    // Access button
    let clearFormBtn = document.getElementById("clear_form_btn");
    let calculateBtn = document.getElementById("calculate_btn");

    let inputCollection =
    {
        targetStrengthInput,
        noiseSourceFrequencyInput,
        signalDurationInput,
        seastateToggleInput,
        avs1XInput,
        avs1YInput,
        avs2XInput,
        avs2YInput,
        targetXInput,
        targetYInput,
    }

    // Convert input type text to number manually
    allowNumberInputOnly(targetStrengthInput);
    allowNumberInputOnly(noiseSourceFrequencyInput);
    allowNumberInputOnly(signalDurationInput);
    allowNumberInputOnly(avs1XInput);
    allowNumberInputOnly(avs1YInput);
    allowNumberInputOnly(avs2XInput);
    allowNumberInputOnly(avs2YInput);
    allowNumberInputOnly(targetXInput);
    allowNumberInputOnly(targetYInput);

    // ON Calculate Button Clicked
    calculateBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Validate all Inputs
        let validationArray = [
            validateInput(targetStrengthInput, "Must be a valid positive or negative integer or floating point number."),
            validateInput(noiseSourceFrequencyInput, "Must be a positive whole integer number."),
            validateInput(signalDurationInput, "Must be a positive integer or floating point number."),
            validateToggleInputs(seastateToggleInput, "Please choose a seastate"),
            validateInput(avs1XInput, "Must be a valid positive or negative integer or floating point number."),
            validateInput(avs1YInput, "Must be a valid positive or negative integer or floating point number."),
            validateInput(avs2XInput, "Must be a valid positive or negative integer or floating point number."),
            validateInput(avs2YInput, "Must be a valid positive or negative integer or floating point number."),
            validateInput(targetXInput, "Must be a valid positive or negative integer or floating point number."),
            validateInput(targetYInput, "Must be a valid positive or negative integer or floating point number."),
        ];

        // Is everything is okay,
        if (!validationArray.includes(false)) {
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
                return true;
            },
            danger: true
        })

    });



    /* ///////////////
        INPUT HISTORY
    /////////////// */

    let inputHistorySec = document.getElementById("input_history_box");

    populateInputHistory(inputHistorySec, INPUT_HISTORY, inputCollection);

})
