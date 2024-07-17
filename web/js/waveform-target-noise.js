import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphdataPoint, Graph, createGraph } from "./components/graphs.js"
import { getLinspaceArray } from "./components/utils.js"
import { UI_COLORS, GRAPH_AXIS_TYPE, GRAPH_INDEX_ITEM_TYPE, GRAPH_TYPE } from "./components/data.js"

document.addEventListener("DOMContentLoaded", () => {

    // MAIN CONTENT's GRID or LIST View
    let mainContentElem = document.querySelector("#");
    let viewToggleBtn = document.querySelector(".view-toggle-btn");

    viewToggleBtn.addEventListener("click", () => {
        viewToggleBtn.classList.toggle("grid-view");
        mainContentElem.classList.toggle("grid-view");
    });

    eel.getFromJSONFile("inputs.json")()
        .then((SOURCE_DATA) => {

            // CREATING GRAPH

            // Target Noise GRAPH
            const buildWaveformGraph = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = getLinspaceArray(SOURCE_DATA);

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
            buildWaveformGraph();

            // Target Noise GRAPH
            const buildHydrophoneWaveformGraph = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = getLinspaceArray(SOURCE_DATA);

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
            buildHydrophoneWaveformGraph();

            // Target Noise GRAPH
            const buildXChannelWaveformGraph = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = getLinspaceArray(SOURCE_DATA);

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
            buildXChannelWaveformGraph();

            // Target Noise GRAPH
            const buildYChannelWaveformGraph = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
                ];

                let { xPoints, yPoints } = getLinspaceArray(SOURCE_DATA);

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
            buildYChannelWaveformGraph();

        });


});