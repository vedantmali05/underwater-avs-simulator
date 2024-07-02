import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphdataPoint, Graph, createGraph } from "./components/graphs.js"
import { getLinspaceArray } from "./components/utils.js"
import { UI_COLORS, GRAPH_AXIS_TYPE, GRAPH_INDEX_ITEM_TYPE, GRAPH_TYPE } from "./components/data.js"
import { ipcRenderer } from "electron";

document.addEventListener("DOMContentLoaded", () => {

    // MAIN CONTENT's GRID or LIST View
    let mainContentElem = document.querySelector("#main_content");
    let viewToggleBtn = document.querySelector(".view-toggle-btn");

    viewToggleBtn.addEventListener("click", () => {
        viewToggleBtn.classList.toggle("grid-view");
        mainContentElem.classList.toggle("grid-view");
    });


    // CREATING GRAPH

    // Target Noise GRAPH
    const buildWaveformGraph = () => {
        // Graph Items
        let graphIndexItems = [
            new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
        ];

        let SOURCE_DATA =
        {
            targetStrength: 1,
            noiseSourceFrequency: 10,
            signalDuration: 0.5,
            samplingRate: 44100,
            avs1X: 10,
            avs1Y: 25,
            avs2X: 32,
            avs2Y: 17,
            targetX: 15,
            targetY: 22,
            seastate: 1,
            recordTime: 1818960001371,
        };
        // let xPoints = [1, 1.2, 1.5, 2, 2.2, 2.5, 3, 3.5, 3.7, 4, 4.5, 4.8, 5, 5.3, 5.5, 6, 6.1, 6.5, 6.8, 7];
        // let yPoints = [0.0, -0.02, 0.05, 0.01, -0.07, 0.09, -0.03, 0.04, -0.01, 0.06, -0.04, 0.10, 0.02, -0.08, 0.00, 0.03, -0.05, 0.07, -0.09, 0.01]
        let { xPoints, yPoints } = getLinspaceArray(SOURCE_DATA.samplingRate, SOURCE_DATA.signalDuration, SOURCE_DATA.noiseSourceFrequency);

        let dataPoints = [];

        xPoints.forEach((x, i) => {
            dataPoints.push([x, yPoints[i]]);
        })

        // X and Y Axis
        let graphAxisX = new GraphAxisX("Time (sec)", false, .05, SOURCE_DATA.signalDuration);
        let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, .5, 1);
        graphAxisY.centeredOrigin = true;

        // Graph Settings
        let graph = new Graph("target_noise", "Target Noise", null, GRAPH_TYPE.waveform);
        graph.adddataPoints(dataPoints);
        graph.addIndexItems(graphIndexItems);
        graph.setAxis(graphAxisX, graphAxisY);

        // Create Graph
        createGraph(graph);
    }
    buildWaveformGraph();

    // Target Noise received by Hydrophone GRAPH
    const buildWaveformHydrophoneGraph = () => {
        // Graph Items
        let graphIndexItems = [
            new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.base),
        ];
        // X and Y Axis
        let graphAxisX = new GraphAxisX("Time (sec)", false, 0.1, 1);
        let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, 0.05, 0.1);
        graphAxisY.centeredOrigin = true;

        // Graph Settings
        let graph = new Graph("target_noise_hydrophone", "Target Noise received by Hydrophone", null, GRAPH_TYPE.positional);
        graph.addIndexItems(graphIndexItems);
        graph.setAxis(graphAxisX, graphAxisY);

        // Create Graph
        createGraph(graph);
    }
    buildWaveformHydrophoneGraph();

    // Target Noise received by AVS X Channel GRAPH
    const buildWaveformAVSXGraph = () => {
        // Graph Items
        let graphIndexItems = [
            new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.base),
        ];
        // X and Y Axis
        let graphAxisX = new GraphAxisX("Time (sec)", false, 0.1, 1);
        let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, 0.05, 0.1);
        graphAxisY.centeredOrigin = true;

        // Graph Settings
        let graph = new Graph("target_noise_avs_x_channel", "Target Noise received by AVS X Channel", null, GRAPH_TYPE.positional);
        graph.addIndexItems(graphIndexItems);
        graph.setAxis(graphAxisX, graphAxisY);

        // Create Graph
        createGraph(graph);
    }
    buildWaveformAVSXGraph();

    // Target Noise received by AVS Y Channel GRAPH
    const buildWaveformAVSYGraph = () => {
        // Graph Items
        let graphIndexItems = [
            new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.base),
        ];
        // X and Y Axis
        let graphAxisX = new GraphAxisX("Time (sec)", false, 0.1, 1);
        let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, 0.05, 0.1);
        graphAxisY.centeredOrigin = true;

        // Graph Settings
        let graph = new Graph("target_noise_avs_y_channel", "Target Noise received by AVS Y Channel", null, GRAPH_TYPE.positional);
        graph.addIndexItems(graphIndexItems);
        graph.setAxis(graphAxisX, graphAxisY);

        // Create Graph
        createGraph(graph);
    }
    buildWaveformAVSYGraph();

});