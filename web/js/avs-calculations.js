import { toTwoDigit, setTitleAttr } from "./components/utils.js"
import { TIME_WEEK_DAYS, TIME_MONTHS } from "./components/data.js";

document.addEventListener("DOMContentLoaded", () => {

    eel.getFromJSONFile("calculations.json")()
        .then((data) => {

            document.getElementById("calculation_avs1_range").innerHTML = Number(data["rangeArr"][0].toFixed(2));
            document.getElementById("calculation_avs2_range").innerHTML = Number(data["rangeArr"][1].toFixed(2));
            document.getElementById("calculation_avs1_rnl").innerHTML = Number(data["RNL1"].toFixed(2));
            document.getElementById("calculation_avs2_rnl").innerHTML = Number(data["RNL2"].toFixed(2));
            document.getElementById("calculation_avs1_snr").innerHTML = Number(data["SNR1"].toFixed(2));
            document.getElementById("calculation_avs2_snr").innerHTML = Number(data["SNR2"].toFixed(2));
            document.getElementById("calculation_avs1_actualDoa").innerHTML = Number(data["actualDoaArr"][0].toFixed(2));
            document.getElementById("calculation_avs2_actualDoa").innerHTML = Number(data["actualDoaArr"][1].toFixed(2));
            document.getElementById("calculation_avs1_estimatedDoa").innerHTML = Number(data["estimatedDoa1"].toFixed(2));
            document.getElementById("calculation_avs2_estimatedDoa").innerHTML = Number(data["estimatedDoa2"].toFixed(2));
            document.getElementById("calculation_avs1_doaError").innerHTML = Number(data["doaError1"].toFixed(7));
            document.getElementById("calculation_avs2_doaError").innerHTML = Number(data["doaError2"].toFixed(7));

            setTitleAttr();
        });


});