import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphDotPoint, Graph, createGraph } from "./components/graphs.js"
import { UI_COLORS, GRAPH_AXIS_TYPE, GRAPH_INDEX_ITEM_TYPE, GRAPH_TYPE } from "./components/data.js"

document.addEventListener("DOMContentLoaded", () => {

    let ESTIMATED_COORDINATES = {
        actualCoordinatesX: 800,
        actualCoordinatesY: 0,
        estimatedCoordinatesX: 820.8,
        estimatedCoordinatesY: -0.302,
        rangeError: 20
    }

    for (const [key, value] of Object.entries(ESTIMATED_COORDINATES)) {
        document.querySelector(`#estimated_target_${key}`).innerHTML = value;
    }



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

    // AVS AND TARGET POSITIONING GRAPH
    const buildPositonalGraph = () => {
        // Graph Items
        let graphIndexItems = [
            new GraphIndexItem("AVS-1", GRAPH_INDEX_ITEM_TYPE.dot, UI_COLORS.accent.light, `1-circle`),
            new GraphIndexItem("AVS-2", GRAPH_INDEX_ITEM_TYPE.dot, UI_COLORS.accent.light, `2-circle`),
            new GraphIndexItem("Target", GRAPH_INDEX_ITEM_TYPE.icon, UI_COLORS.primary.hover, `crosshair`),
        ];
        // Dot Points
        let graphDotPoints = [
            new GraphDotPoint(graphIndexItems[0], 0, 20),
            new GraphDotPoint(graphIndexItems[1], 0, 40),
            new GraphDotPoint(graphIndexItems[2], 800, 0)
        ];
        // X and Y Axis
        let graphAxisX = new GraphAxisX("Distance (m)");
        let graphAxisY = new GraphAxisY("Distance (m)");

        // Graph Settings
        let graph = new Graph("avs_target_position", "AVS and Target Positions Graph", "The Graph shows shows the actual positions of the AVS sensors and target.", GRAPH_TYPE.positional);
        graph.addDotPoints(graphDotPoints);
        graph.addIndexItems(graphIndexItems);
        graph.setAxis(graphAxisX, graphAxisY);

        // Create Graph
        createGraph(graph);
    }
    buildPositonalGraph();

    // ESTIMATED TARGET POSITIONING GRAPH
    const buildEstimatedPositionalGraph = () => {
        // Graph Items
        let graphIndexItems = [
            new GraphIndexItem("AVS-1", GRAPH_INDEX_ITEM_TYPE.dot, UI_COLORS.accent.light, `1-circle`),
            new GraphIndexItem("AVS-2", GRAPH_INDEX_ITEM_TYPE.dot, UI_COLORS.accent.light, `2-circle`),
            new GraphIndexItem("Target's Actual Position", GRAPH_INDEX_ITEM_TYPE.icon, UI_COLORS.primary.hover, `crosshair`),
            new GraphIndexItem("Target's Estimated Position", GRAPH_INDEX_ITEM_TYPE.icon, UI_COLORS.primary.hover, `crosshair2`),
        ];
        // Dot Points
        let graphDotPoints = [
            new GraphDotPoint(graphIndexItems[0], 0, 20),
            new GraphDotPoint(graphIndexItems[1], 0, 40),
            new GraphDotPoint(graphIndexItems[2], 800, 0),
            new GraphDotPoint(graphIndexItems[3], 820.8, -0.302)
        ];
        // X and Y Axis
        let graphAxisX = new GraphAxisX("Distance (m)");
        let graphAxisY = new GraphAxisY("Distance (m)");

        // Graph Settings
        let graph = new Graph("estimated_target_position", "Estimated Target Positioning Graph", "The Graph shows shows the actual and estimated position of the target.", GRAPH_TYPE.positional);
        graph.addDotPoints(graphDotPoints);
        graph.addIndexItems(graphIndexItems);
        graph.setAxis(graphAxisX, graphAxisY);

        // Create Graph
        createGraph(graph);
    }

    buildEstimatedPositionalGraph();

});