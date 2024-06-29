import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphDotPoint, Graph, createGraph } from "./components/graphs.js"
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

    // Target Noise GRAPH
    const buildWaveformGraph = () => {
        // Graph Items
        let graphIndexItems = [
            new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.base),
            new GraphIndexItem("Meow", GRAPH_INDEX_ITEM_TYPE.dot, UI_COLORS.primary.base)
        ];

        let xPoints = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 1.2, 2.2, 3.7, 4.8, 5.3, 6.1, 6.8];
        let yPoints = [0.08, -0.02, 0.05, 0.01, -0.07, 0.09, -0.03, 0.04, -0.01, 0.06, -0.04, 0.10, 0.02, -0.08, 0.00, 0.03, -0.05, 0.07, -0.09, 0.01]

        let dotPoints = [];

        xPoints.forEach((x, i) => {
            dotPoints.push(new GraphDotPoint(graphIndexItems[1], x, yPoints[i]));
        })

        // X and Y Axis
        let graphAxisX = new GraphAxisX("Time (sec)", false, 1, 7);
        let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, 0.05, 0.1);
        graphAxisX.originPoint = 1;
        graphAxisY.centeredOrigin = true;

        // Graph Settings
        let graph = new Graph("target_noise", "Target Noise", null, GRAPH_TYPE.positional);
        graph.addDotPoints(dotPoints);
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
        let graph = new Graph("target_noise_hydrophone", "Target Noise received by Hydrophone", null, GRAPH_TYPE.waveform);
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
        let graph = new Graph("target_noise_avs_x_channel", "Target Noise received by AVS X Channel", null, GRAPH_TYPE.waveform);
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
        let graph = new Graph("target_noise_avs_y_channel", "Target Noise received by AVS Y Channel", null, GRAPH_TYPE.waveform);
        graph.addIndexItems(graphIndexItems);
        graph.setAxis(graphAxisX, graphAxisY);

        // Create Graph
        createGraph(graph);
    }
    buildWaveformAVSYGraph();

});