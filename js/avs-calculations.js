import { toTwoDigit } from "./components/utils.js"
import { TIME_WEEK_DAYS, TIME_MONTHS } from "./components/data.js";

document.addEventListener("DOMContentLoaded", () => {


    let SOURCE_DATA =
    {
        targetStrength: 1,
        noiseSourceFrequency: 2000,
        signalDuration: 1.2,
        avs1X: 10,
        avs1Y: 25,
        avs2X: 32,
        avs2Y: 17,
        targetX: 15,
        targetY: 22,
        seastate: 1,
        recordTime: 1818960001371,
    };

    let CALCULATIONS_AVS1 = {
        range: 1,
        rnl: 1,
        snr: 1,
        actualDoa: 1,
        estimatedDoa: 1,
        doaError: 1,
    }

    let CALCULATIONS_AVS2 = {
        range: 1,
        rnl: 1,
        snr: 1,
        actualDoa: 1,
        estimatedDoa: 1,
        doaError: 1,
    }

    let allData = [SOURCE_DATA, CALCULATIONS_AVS1, CALCULATIONS_AVS2];
    let idPrefix = ["source_data", "calculation_avs1", "calculation_avs2"];

    allData.forEach((item, i) => {
        for (const [key, value] of Object.entries(item)) {
            let elem = document.getElementById(`${idPrefix[i]}_${key}`);
            if (elem) elem.innerHTML = value;
        }
    })


});