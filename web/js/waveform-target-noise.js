import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphdataPoint, Graph, createGraph } from "./components/graphs.js"
import { getLinspaceArray, setLoadingSpinner, removeLoader } from "./components/utils.js"
import { UI_COLORS, UI_SIZE, GRAPH_AXIS_TYPE, GRAPH_INDEX_ITEM_TYPE, GRAPH_TYPE } from "./components/data.js"

function buildWaveformGraphs(id, SOURCE_DATA, dataParam) {
    // setLoadingSpinner(document.querySelector(`#${id}`), "black", UI_SIZE.l);

    // Graph Items
    let graphIndexItems = [
        new GraphIndexItem("Noise", GRAPH_INDEX_ITEM_TYPE.line, UI_COLORS.primary.dark),
    ];

    let { xPoints, yPoints } = { xPoints: SOURCE_DATA["t"], yPoints: SOURCE_DATA[dataParam] };

    let dataPoints = [];

    xPoints.forEach((x, i) => {
        dataPoints.push([x, yPoints[i]]);
    })

    // X and Y Axis
    let graphAxisX = new GraphAxisX("Time (sec)", false, SOURCE_DATA.signalDuration / 5, SOURCE_DATA.signalDuration);
    let graphAxisY = new GraphAxisY("Amplitude (Volts)", false, .5, 1);
    graphAxisY.centeredOrigin = true;

    // Graph Settings
    let graph = new Graph(id, "Target Noise", null, GRAPH_TYPE.waveform);
    graph.adddataPoints(dataPoints);
    graph.addIndexItems(graphIndexItems);
    graph.setAxis(graphAxisX, graphAxisY);

    // Create Graph
    createGraph(graph);

    // removeLoader(document.querySelector(`#${id}`))
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

    setLoadingSpinner(document.body, "black", UI_SIZE.l);
    eel.getFromJSONFile("calculations.json")()
        .then((SOURCE_DATA) => {


            // CREATING GRAPH
            /* ///////////////
                AVS 1
            /////////////// */
            buildWaveformGraphs("target_noise_1", SOURCE_DATA, "Tx");
            buildWaveformGraphs("target_noise_hydrophone_1", SOURCE_DATA, "p1");
            buildWaveformGraphs("target_noise_avs_x_channel_1", SOURCE_DATA, "vx1");
            buildWaveformGraphs("target_noise_avs_y_channel_1", SOURCE_DATA, "vy1");
            /* ///////////////
            AVS 2
            /////////////// */
            buildWaveformGraphs("target_noise_2", SOURCE_DATA, "Tx");
            buildWaveformGraphs("target_noise_hydrophone_2", SOURCE_DATA, "p2");
            buildWaveformGraphs("target_noise_avs_x_channel_2", SOURCE_DATA, "vx2");
            buildWaveformGraphs("target_noise_avs_y_channel_2", SOURCE_DATA, "vy2");

        });
    setTimeout(() => {
        removeLoader(document.body)
    }, 1000);
});