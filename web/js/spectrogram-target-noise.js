import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphdataPoint, Graph, createGraph } from "./components/graphs.js"
import { UI_COLORS, GRAPH_AXIS_TYPE, GRAPH_INDEX_ITEM_TYPE, GRAPH_TYPE } from "./components/data.js"

document.addEventListener("DOMContentLoaded", () => {

    // MAIN CONTENT's GRID or LIST View
    let mainContentElem = document.querySelector("#main_content");
    let viewToggleBtn = document.querySelector(".view-toggle-btn");

    viewToggleBtn.addEventListener("click", () => {
        viewToggleBtn.classList.toggle("grid-view");
        mainContentElem.classList.toggle("grid-view");
    });

    // CREATING GRAPH

    eel.getFromJSONFile("inputs.json")()
        .then((SOURCE_DATA) => {
            // Target Noise GRAPH
            const buildSpectrogramGraph = () => {
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Frequency (Hz)", false, (SOURCE_DATA.samplingRate / 2) / 5, SOURCE_DATA.samplingRate / 2);

                // Graph Settings
                let graph = new Graph("target_noise", "Target Noise", null, GRAPH_TYPE.spectrogram);
                graph.setAxis(graphAxisX, graphAxisY);

                eel.saveSpectrogramImage("target_noise_spectrogram.png", SOURCE_DATA.noiseSourceFrequency, SOURCE_DATA.samplingRate, SOURCE_DATA.signalDuration, 0.5)()
                    .then((spectrogramData) => {
                        // Create Graph
                        graph.spectrogramData = spectrogramData;
                        createGraph(graph);
                    });

            }
            buildSpectrogramGraph();
        });


});