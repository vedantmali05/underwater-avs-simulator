import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphdataPoint, Graph, createGraph } from "./components/graphs.js"
import { UI_COLORS, GRAPH_AXIS_TYPE, GRAPH_INDEX_ITEM_TYPE, GRAPH_TYPE } from "./components/data.js"

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
            // Target Noise GRAPH
            const buildSpectrogramGraph1 = () => {
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Frequency (Hz)", false, (SOURCE_DATA.samplingRate / 2) / 5, SOURCE_DATA.samplingRate / 2);

                // Graph Settings
                let graph = new Graph("target_noise_1", "Target Noise", null, GRAPH_TYPE.spectrogram);
                graph.setAxis(graphAxisX, graphAxisY);

                eel.saveSpectrogramImage("Tx")()
                    .then((spectrogramData) => {
                        // Create Graph
                        graph.spectrogramData = spectrogramData;
                        createGraph(graph);
                    });

            }
            buildSpectrogramGraph1();

            const buildHydrophoneSpectrogramGraph1 = () => {
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Frequency (Hz)", false, (SOURCE_DATA.samplingRate / 2) / 5, SOURCE_DATA.samplingRate / 2);

                // Graph Settings
                let graph = new Graph("target_noise_hydrophone_1", "Target Noise received by Hydrophone", null, GRAPH_TYPE.spectrogram);
                graph.setAxis(graphAxisX, graphAxisY);

                eel.saveSpectrogramImage("p1")()
                    .then((spectrogramData) => {
                        // Create Graph
                        graph.spectrogramData = spectrogramData;
                        createGraph(graph);
                    });

            }
            buildHydrophoneSpectrogramGraph1();
            const buildXChannelSpectrogramGraph1 = () => {
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Frequency (Hz)", false, (SOURCE_DATA.samplingRate / 2) / 5, SOURCE_DATA.samplingRate / 2);

                // Graph Settings
                let graph = new Graph("target_noise_avs_x_channel_1", "Target Noise received by AVS X Channel", null, GRAPH_TYPE.spectrogram);
                graph.setAxis(graphAxisX, graphAxisY);

                eel.saveSpectrogramImage("vx1")()
                    .then((spectrogramData) => {
                        // Create Graph
                        graph.spectrogramData = spectrogramData;
                        createGraph(graph);
                    });

            }
            buildXChannelSpectrogramGraph1();
            const buildYChannelSpectrogramGraph1 = () => {
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Frequency (Hz)", false, (SOURCE_DATA.samplingRate / 2) / 5, SOURCE_DATA.samplingRate / 2);

                // Graph Settings
                let graph = new Graph("target_noise_avs_y_channel_1", "Target Noise received by AVS Y Channel", null, GRAPH_TYPE.spectrogram);
                graph.setAxis(graphAxisX, graphAxisY);

                eel.saveSpectrogramImage("vy1")()
                    .then((spectrogramData) => {
                        // Create Graph
                        graph.spectrogramData = spectrogramData;
                        createGraph(graph);
                    });

            }
            buildYChannelSpectrogramGraph1();

            /* ///////////////
                AVS 2
            /////////////// */

            // Target Noise GRAPH
            const buildSpectrogramGraph2 = () => {
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Frequency (Hz)", false, (SOURCE_DATA.samplingRate / 2) / 5, SOURCE_DATA.samplingRate / 2);

                // Graph Settings
                let graph = new Graph("target_noise_2", "Target Noise", null, GRAPH_TYPE.spectrogram);
                graph.setAxis(graphAxisX, graphAxisY);

                eel.saveSpectrogramImage("Tx")()
                    .then((spectrogramData) => {
                        // Create Graph
                        graph.spectrogramData = spectrogramData;
                        createGraph(graph);
                    });

            }
            buildSpectrogramGraph2();

            const buildHydrophoneSpectrogramGraph2 = () => {
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Frequency (Hz)", false, (SOURCE_DATA.samplingRate / 2) / 5, SOURCE_DATA.samplingRate / 2);

                // Graph Settings
                let graph = new Graph("target_noise_hydrophone_2", "Target Noise received by Hydrophone", null, GRAPH_TYPE.spectrogram);
                graph.setAxis(graphAxisX, graphAxisY);

                eel.saveSpectrogramImage("p2")()
                    .then((spectrogramData) => {
                        // Create Graph
                        graph.spectrogramData = spectrogramData;
                        createGraph(graph);
                    });

            }
            buildHydrophoneSpectrogramGraph2();
            const buildXChannelSpectrogramGraph2 = () => {
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Frequency (Hz)", false, (SOURCE_DATA.samplingRate / 2) / 5, SOURCE_DATA.samplingRate / 2);

                // Graph Settings
                let graph = new Graph("target_noise_avs_x_channel_2", "Target Noise received by AVS X Channel", null, GRAPH_TYPE.spectrogram);
                graph.setAxis(graphAxisX, graphAxisY);

                eel.saveSpectrogramImage("vx2")()
                    .then((spectrogramData) => {
                        // Create Graph
                        graph.spectrogramData = spectrogramData;
                        createGraph(graph);
                    });

            }
            buildXChannelSpectrogramGraph2();
            const buildYChannelSpectrogramGraph2 = () => {
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Frequency (Hz)", false, (SOURCE_DATA.samplingRate / 2) / 5, SOURCE_DATA.samplingRate / 2);

                // Graph Settings
                let graph = new Graph("target_noise_avs_y_channel_2", "Target Noise received by AVS Y Channel", null, GRAPH_TYPE.spectrogram);
                graph.setAxis(graphAxisX, graphAxisY);

                eel.saveSpectrogramImage("vy2")()
                    .then((spectrogramData) => {
                        // Create Graph
                        graph.spectrogramData = spectrogramData;
                        createGraph(graph);
                    });

            }
            buildYChannelSpectrogramGraph2();
        });


});