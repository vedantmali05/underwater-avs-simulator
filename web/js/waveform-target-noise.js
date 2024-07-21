import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphdataPoint, Graph, createGraph } from "./components/graphs.js"
import { getLinspaceArray, setLoadingSpinner, removeLoader } from "./components/utils.js"
import { UI_COLORS, UI_SIZE, GRAPH_AXIS_TYPE, GRAPH_INDEX_ITEM_TYPE, GRAPH_TYPE } from "./components/data.js"

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

    eel.getFromJSONFile("calculations.json")()
        .then((SOURCE_DATA) => {

            setLoadingSpinner(document.body, "black", UI_SIZE.xl);

            // CREATING GRAPH

            // Target Noise GRAPH
            const buildWaveformGraph1 = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = { xPoints: SOURCE_DATA["t"], yPoints: SOURCE_DATA["Tx"] };

                let dataPoints = [];

                xPoints.forEach((x, i) => {
                    dataPoints.push([x, yPoints[i]]);
                })

                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, .5, 1);
                graphAxisY.centeredOrigin = true;

                // Graph Settings
                let graph = new Graph("target_noise_1", "Target Noise", null, GRAPH_TYPE.waveform);
                graph.adddataPoints(dataPoints);
                graph.addIndexItems(graphIndexItems);
                graph.setAxis(graphAxisX, graphAxisY);

                // Create Graph
                createGraph(graph);
            }
            buildWaveformGraph1();
            const buildHydrophoneWaveformGraph1 = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = { xPoints: SOURCE_DATA["t"], yPoints: SOURCE_DATA["p1"] };

                let dataPoints = [];

                xPoints.forEach((x, i) => {
                    dataPoints.push([x, yPoints[i]]);
                })

                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, .5, 1);
                graphAxisY.centeredOrigin = true;

                // Graph Settings
                let graph = new Graph("target_noise_hydrophone_1", "Target Noise", null, GRAPH_TYPE.waveform);
                graph.adddataPoints(dataPoints);
                graph.addIndexItems(graphIndexItems);
                graph.setAxis(graphAxisX, graphAxisY);

                // Create Graph
                createGraph(graph);
            }
            buildHydrophoneWaveformGraph1();
            const buildXChannelWaveformGraph1 = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = { xPoints: SOURCE_DATA["t"], yPoints: SOURCE_DATA["vx1"] };

                let dataPoints = [];

                xPoints.forEach((x, i) => {
                    dataPoints.push([x, yPoints[i]]);
                })

                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, .5, 1);
                graphAxisY.centeredOrigin = true;

                // Graph Settings
                let graph = new Graph("target_noise_avs_x_channel_1", "Target Noise", null, GRAPH_TYPE.waveform);
                graph.adddataPoints(dataPoints);
                graph.addIndexItems(graphIndexItems);
                graph.setAxis(graphAxisX, graphAxisY);

                // Create Graph
                createGraph(graph);
            }
            buildXChannelWaveformGraph1();
            const buildYChannelWaveformGraph1 = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = { xPoints: SOURCE_DATA["t"], yPoints: SOURCE_DATA["vy1"] };

                let dataPoints = [];

                xPoints.forEach((x, i) => {
                    dataPoints.push([x, yPoints[i]]);
                })

                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, .5, 1);
                graphAxisY.centeredOrigin = true;

                // Graph Settings
                let graph = new Graph("target_noise_avs_y_channel_1", "Target Noise", null, GRAPH_TYPE.waveform);
                graph.adddataPoints(dataPoints);
                graph.addIndexItems(graphIndexItems);
                graph.setAxis(graphAxisX, graphAxisY);

                // Create Graph
                createGraph(graph);
            }
            buildYChannelWaveformGraph1();

            /* ///////////////
                AVS 2
            /////////////// */

            // Target Noise GRAPH
            const buildWaveformGraph2 = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = { xPoints: SOURCE_DATA["t"], yPoints: SOURCE_DATA["Tx"] };

                let dataPoints = [];

                xPoints.forEach((x, i) => {
                    dataPoints.push([x, yPoints[i]]);
                })

                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, .5, 1);
                graphAxisY.centeredOrigin = true;

                // Graph Settings
                let graph = new Graph("target_noise_2", "Target Noise", null, GRAPH_TYPE.waveform);
                graph.adddataPoints(dataPoints);
                graph.addIndexItems(graphIndexItems);
                graph.setAxis(graphAxisX, graphAxisY);

                // Create Graph
                createGraph(graph);
            }
            buildWaveformGraph2();
            const buildHydrophoneWaveformGraph2 = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = { xPoints: SOURCE_DATA["t"], yPoints: SOURCE_DATA["p2"] };

                let dataPoints = [];

                xPoints.forEach((x, i) => {
                    dataPoints.push([x, yPoints[i]]);
                })

                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, .5, 1);
                graphAxisY.centeredOrigin = true;

                // Graph Settings
                let graph = new Graph("target_noise_hydrophone_2", "Target Noise", null, GRAPH_TYPE.waveform);
                graph.adddataPoints(dataPoints);
                graph.addIndexItems(graphIndexItems);
                graph.setAxis(graphAxisX, graphAxisY);

                // Create Graph
                createGraph(graph);
            }
            buildHydrophoneWaveformGraph2();
            const buildXChannelWaveformGraph2 = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = { xPoints: SOURCE_DATA["t"], yPoints: SOURCE_DATA["vx2"] };

                let dataPoints = [];

                xPoints.forEach((x, i) => {
                    dataPoints.push([x, yPoints[i]]);
                })

                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, .5, 1);
                graphAxisY.centeredOrigin = true;

                // Graph Settings
                let graph = new Graph("target_noise_avs_x_channel_2", "Target Noise", null, GRAPH_TYPE.waveform);
                graph.adddataPoints(dataPoints);
                graph.addIndexItems(graphIndexItems);
                graph.setAxis(graphAxisX, graphAxisY);

                // Create Graph
                createGraph(graph);
            }
            buildXChannelWaveformGraph2();
            const buildYChannelWaveformGraph2 = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = { xPoints: SOURCE_DATA["t"], yPoints: SOURCE_DATA["vy2"] };

                let dataPoints = [];

                xPoints.forEach((x, i) => {
                    dataPoints.push([x, yPoints[i]]);
                })

                // X and Y Axis
                let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
                let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, .5, 1);
                graphAxisY.centeredOrigin = true;

                // Graph Settings
                let graph = new Graph("target_noise_avs_y_channel_2", "Target Noise", null, GRAPH_TYPE.waveform);
                graph.adddataPoints(dataPoints);
                graph.addIndexItems(graphIndexItems);
                graph.setAxis(graphAxisX, graphAxisY);

                // Create Graph
                createGraph(graph);
            }
            buildYChannelWaveformGraph2();

            removeLoader(document.body);
        });
});