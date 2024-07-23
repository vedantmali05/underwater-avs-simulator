import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphdataPoint, Graph, createGraph } from "./components/graphs.js"
import { UI_COLORS, GRAPH_AXIS_TYPE, GRAPH_INDEX_ITEM_TYPE, GRAPH_TYPE, UI_SIZE } from "./components/data.js"
import { removeLoader, setLoadingSpinner } from "./components/utils.js";

function buildSpectrogramGraphs(id, SOURCE_DATA, dataParam) {
    // X and Y Axis
    let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
    let graphAxisY = new GraphAxisY("Frequency (Hz)", false, (SOURCE_DATA.samplingRate / 2) / 5, SOURCE_DATA.samplingRate / 2);

    // Graph Settings
    let graph = new Graph(id, "Target Noise", null, GRAPH_TYPE.spectrogram);
    graph.setAxis(graphAxisX, graphAxisY);

    eel.saveSpectrogramImage(dataParam)()
        .then((spectrogramData) => {
            // Create Graph
            graph.spectrogramData = spectrogramData;
            createGraph(graph);
        });
}

document.addEventListener("DOMContentLoaded", () => {

    // MAIN CONTENT's GRID or LIST View
    let mainContentElem = document.querySelectorAll(".main-content");
    let viewToggleBtn = document.querySelector(".view-toggle-btn");

    viewToggleBtn.addEventListener("click", () => {
        viewToggleBtn.classList.toggle("grid-view");
        mainContentElem.forEach(elem => {
            elem.classList.toggle("grid-view");
        })
    });

    // CREATING GRAPH

    eel.getFromJSONFile("inputs.json")()
        .then((SOURCE_DATA) => {
            setLoadingSpinner(document.body, "black", UI_SIZE.l);
            /* ///////////////
                AVS 1
            /////////////// */
            buildSpectrogramGraphs("target_noise_1", SOURCE_DATA, "Tx");
            buildSpectrogramGraphs("target_noise_hydrophone_1", SOURCE_DATA, "p1");
            buildSpectrogramGraphs("target_noise_avs_x_channel_1", SOURCE_DATA, "vx1");
            buildSpectrogramGraphs("target_noise_avs_y_channel_1", SOURCE_DATA, "vy1");
            /* ///////////////
                AVS 2
            /////////////// */
            buildSpectrogramGraphs("target_noise_2", SOURCE_DATA, "Tx");
            buildSpectrogramGraphs("target_noise_hydrophone_2", SOURCE_DATA, "p2");
            buildSpectrogramGraphs("target_noise_avs_x_channel_2", SOURCE_DATA, "vx2");
            buildSpectrogramGraphs("target_noise_avs_y_channel_2", SOURCE_DATA, "vy2");
            setTimeout(() => {
                removeLoader(document.body)
            }, 1000);
        });

});