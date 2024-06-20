// Imports
import { allowNumberInputOnly, createDialog, createSnackbar, validateInput, validateToggleInputs } from "./components/utils.js"


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

    })

})
