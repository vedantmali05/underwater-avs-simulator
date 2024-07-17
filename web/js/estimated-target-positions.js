import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphdataPoint, Graph, createGraph } from "./components/graphs.js"
import { UI_COLORS, GRAPH_AXIS_TYPE, GRAPH_INDEX_ITEM_TYPE, GRAPH_TYPE } from "./components/data.js"

document.addEventListener("DOMContentLoaded", () => {

    eel.getFromJSONFile("calculations.json")()
        .then((data) => {

            document.getElementById("estimated_target_actualCoordinatesX").innerHTML = Number((data["targetX"]).toFixed(2));
            document.getElementById("estimated_target_actualCoordinatesY").innerHTML = Number((data["targetY"]).toFixed(2));
            document.getElementById("estimated_target_estimatedCoordinatesX").innerHTML = Number((data["estimatedTargetX"]).toFixed(2));
            document.getElementById("estimated_target_estimatedCoordinatesY").innerHTML = Number((data["estimatedTargetY"]).toFixed(2));
            document.getElementById("estimated_target_rangeError").innerHTML = Number(data["rangeError"].toFixed(2));

            // AVS AND TARGET POSITIONING GRAPH
            const buildPositonalGraph = () => {
                // Graph Items
                let graphIndexItems = [
                    new GraphIndexItem("AVS-1", GRAPH_INDEX_ITEM_TYPE.dot, UI_COLORS.accent.light, `1-circle`),
                    new GraphIndexItem("AVS-2", GRAPH_INDEX_ITEM_TYPE.dot, UI_COLORS.accent.light, `2-circle`),
                    new GraphIndexItem("Target", GRAPH_INDEX_ITEM_TYPE.icon, UI_COLORS.primary.hover, `crosshair`),
                ];
                // Data Points
                let graphdataPoints = [
                    new GraphdataPoint(graphIndexItems[0], data["avs1X"], data["avs1Y"]),
                    new GraphdataPoint(graphIndexItems[1], data["avs2X"], data["avs2Y"]),
                    new GraphdataPoint(graphIndexItems[2], data["targetX"], data["targetY"])
                ];
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Distance (m)");
                let graphAxisY = new GraphAxisY("Distance (m)");

                // Graph Settings
                let graph = new Graph("avs_target_position", "AVS and Target Positions Graph", "The Graph shows shows the actual positions of the AVS sensors and target.", GRAPH_TYPE.positional);
                graph.adddataPoints(graphdataPoints);
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
                // Data Points
                let graphdataPoints = [
                    new GraphdataPoint(graphIndexItems[0], data["avs1X"], data["avs1Y"]),
                    new GraphdataPoint(graphIndexItems[1], data["avs2X"], data["avs2Y"]),
                    new GraphdataPoint(graphIndexItems[2], data["targetX"], data["targetY"]),
                    new GraphdataPoint(graphIndexItems[3], data["estimatedTargetX"], data["estimatedTargetY"])
                ];
                // X and Y Axis
                let graphAxisX = new GraphAxisX("Distance (m)");
                let graphAxisY = new GraphAxisY("Distance (m)");

                // Graph Settings
                let graph = new Graph("estimated_target_position", "Estimated Target Positioning Graph", "The Graph shows shows the actual and estimated position of the target.", GRAPH_TYPE.positional);
                graph.adddataPoints(graphdataPoints);
                graph.addIndexItems(graphIndexItems);
                graph.setAxis(graphAxisX, graphAxisY);

                // Create Graph
                createGraph(graph);
            }

            buildEstimatedPositionalGraph();

        })
});