// IMPORTS
import { GRAPH_AXIS_TYPE, GRAPH_TYPE, UI_COLORS } from "./data.js"
import { getCoordinatePercentages } from "./utils.js"


/* ///////////////
    CLASS TEMPLATE FOR GRAPH
/////////////// */

// Graph Button Controls
export class GraphControls {
    zoom = true;
    pan = true;
    saveAsPDF = true;
    clearGraph = true;
}

// Graph's Index Item
export class GraphIndexItem {
    constructor(label, type, color = UI_COLORS.black, icon = null) {
        this.label = label;
        this.type = type;
        this.color = color;
        this.icon = icon;
    }
}

// Graph Data Point
export class GraphdataPoint {
    constructor(indexItemProperties, x, y) {
        this.label = indexItemProperties.label;
        this.color = indexItemProperties.color;
        this.icon = indexItemProperties.icon;
        this.x = x;
        this.y = y;
    }
}

// Graph's X Axis and Y Axis
export class GraphAxis {
    constructor(label, setDynamically = true, pointDifference = 0, maxPoint = 0) {
        this.label = label;
        this.originPoint = 0;
        this.centeredOrigin = false;
        this.pointDifference = pointDifference;
        this.maxPoint = maxPoint;
        this.setDynamically = setDynamically;
    }
}

export class GraphAxisX extends GraphAxis {
    constructor(label, setDynamically = true, pointDifference = 0, maxPoint = 0) {
        super(label, setDynamically, pointDifference, maxPoint);
    }
}

export class GraphAxisY extends GraphAxis {
    constructor(label, setDynamically = true, pointDifference = 0, maxPoint = 0) {
        super(label, setDynamically, pointDifference, maxPoint);
    }
}

// GRAPH
export class Graph {
    constructor(parentID, title, description, type) {
        this.parentID = parentID;
        this.title = title;
        this.description = description;
        this.type = type;
        this.controls = new GraphControls();
        this.indexItems = [];
        this.axisX = {};
        this.axisY = {};
        this.dataPoints = [];
    }

    setAxis(axisX, axisY) {
        this.axisX = axisX;
        this.axisY = axisY;
    }

    addIndexItems(indexItem) {
        this.indexItems = this.indexItems.concat(indexItem);
    }

    adddataPoints(dataPoint) {
        if (this.type == GRAPH_TYPE.positional) {
            this.dataPoints = this.dataPoints.concat(dataPoint);
        } else if (this.type == GRAPH_TYPE.waveform) {
            this.dataPoints = dataPoint;
        }
    }

}


/* ///////////////
    CREATE GRAPH FUNCTION
/////////////// */

// Create the TITLE SECTION of the Graph
function createGraphTitleSec(title, description, controls, indexItems) {
    // Create the title section element
    let titleSec = document.createElement("div");
    titleSec.classList.add("title-sec");

    // Build the HTML content with template literals
    titleSec.innerHTML = `
        <h3>${title}</h3>
        ${description ? `<p class="subtitle">${description}</p>` : ``}
        <div class="controls-box">
            <div class="controls">
            ${controls.pan ?
            `<button class="icon control-pan"><i class="bi bi-arrows-move"></i></button>` : ``}
            ${controls.zoom ?
            `<span class="btn-box">
            <button class="icon control-zoom-in"><i class="bi bi-zoom-in"></i></button>
             <span>Zoom</span>
             <button class="icon control-zoom-out"><i class="bi bi-zoom-out"></i></button>
             </span>` : ``}
            </div>
        </div>
    `;

    titleSec.querySelector(".controls-box").prepend(createGraphIndexSec(indexItems))

    // Return to append
    return titleSec;
}

// Create the INDEX SECTION of the Graph
function createGraphIndexSec(indexItems) {
    // Create the index section element
    let indexSec = document.createElement("div");
    indexSec.classList.add("index-sec");

    // Build the index items HTML string
    let indexItemsHTML = `<p>Index:</p>`;
    indexItems.forEach(item => {
        indexItemsHTML += `
        <li class="index-item" style="--clr-index: ${item.color}">
            <span class="index-symbol ${item.type}">
            ${item.icon ? `<i class="bi bi-${item.icon}"></i>` : ``}
            </span> 
            <span class="fs-300">${item.label}</span>
        </li>
        `;
    });

    indexSec.innerHTML = `
        <ul class="index">${indexItemsHTML}</ul>
    `;

    // Return to Append
    return indexSec;
}

// FUNCTION TO CREATE AXIS GRID LINES
function createAxisGridLines(axisType, axisInfo, holder) {

    // axisInfo destructuring
    const { originPoint, maxPoint, centeredOrigin, pointDifference } = axisInfo;

    // START AND END for Iteration
    let start = originPoint;
    let end = maxPoint;

    // If origin in center,
    if (centeredOrigin) start -= (maxPoint - start);

    // Append Lines
    for (let i = start; i <= end; i += pointDifference) {
        // Only upto 4 decimal points allowed
        const pointValue = !Number.isInteger(i) ? i.toFixed(4).replace(/0+$/, "").replace(/\.$/, "") : i;
        // Create and append the grid lines
        let gridLine = document.createElement("span");
        gridLine.innerHTML = `<span class="value">${pointValue}</span><span class="line"></span><span class="point"></span>`;
        gridLine.classList.add(`grid-line-${axisType}`);
        if (axisType == GRAPH_AXIS_TYPE.x)
            holder.append(gridLine);
        else
            holder.prepend(gridLine);
    }
}

// FUNCTION TO SET MIN AND MAX AXIS POINTS DYNAMICALLY
function setMinMaxDynamically(axisType, axis, dataPoints) {
    // If setDynamically is true,
    if (axis.setDynamically) {
        // Don't center the origin
        axis.centeredOrigin = false;

        // Find lowest and highest values (X or Y) among all dataPoints
        let lowest = dataPoints[0][axisType];
        let highest = dataPoints[0][axisType];
        dataPoints.forEach(point => {
            lowest = Math.min(lowest, point[axisType]);
            highest = Math.max(highest, point[axisType]);
        });

        // Set axis origin and max point with point difference
        axis.pointDifference = Math.round((highest - lowest) / 5);
        axis.originPoint = Math.round(lowest - axis.pointDifference);
        axis.maxPoint = Math.round(highest + axis.pointDifference);

    }
    return axis;
}

// FUNCTION TO CREATE GRAPH UI
export function createGraph(options = {}) {
    // BUILDING GRAPH
    const {
        parentID,
        title,
        description,
        type,
        controls,
        indexItems,
        dataPoints,
    } = options;
    let { axisX, axisY } = options;

    // Set X and Y originPoint, maxPoint and pointDifference dynamically
    axisX = setMinMaxDynamically(GRAPH_AXIS_TYPE.x, axisX, dataPoints);
    axisY = setMinMaxDynamically(GRAPH_AXIS_TYPE.y, axisY, dataPoints);

    // Create the main graph container element
    const graphBox = document.createElement("div");
    graphBox.classList.add("graph-box");

    // X and Y Axis name and label
    const axisXLabel = document.createElement("p");
    axisXLabel.classList.add("axis-x-label");
    axisXLabel.innerText = axisX.label;

    const axisYLabel = document.createElement("p");
    axisYLabel.classList.add("axis-y-label");
    axisYLabel.innerText = axisY.label;
    // Appending created X and Y Labels
    graphBox.append(axisXLabel, axisYLabel);

    // Create the graph holder element and its sub-containers
    const graphHolder = document.createElement("div");
    graphHolder.classList.add("graph-holder");
    // X Axis Grid lines
    let gridLineXHolder = document.createElement("div");
    gridLineXHolder.classList.add("grid-line-x-holder");
    // Y Axis Grid lines
    let gridLineYHolder = document.createElement("div");
    gridLineYHolder.classList.add("grid-line-y-holder");
    // Appending created Grid Lines holders
    graphHolder.append(gridLineXHolder, gridLineYHolder);
    graphBox.append(graphHolder);

    // Create X and Y Grid Lines and Append them
    createAxisGridLines(GRAPH_AXIS_TYPE.x, axisX, gridLineXHolder);
    createAxisGridLines(GRAPH_AXIS_TYPE.y, axisY, gridLineYHolder);

    // GET GRAPH SECTION by parentID and append Title Section, Graph and Index Items
    const graphSec = document.getElementById(parentID);

    // APPENDING 
    graphSec.append(
        createGraphTitleSec(title, description, controls, indexItems),
        graphBox,
    );

    // GRID X and Y Elems Positioning and Sizing
    let gridXElems = graphSec.querySelectorAll(".grid-line-x");
    let gridYElems = graphSec.querySelectorAll(".grid-line-y");
    let gridXIntervals = 100 / (gridXElems.length - 1);
    let gridYIntervals = 100 / (gridYElems.length - 1);

    // Position X Axis Lines 
    gridXElems.forEach((elem, i) => {
        elem.style.left = `calc(${i * gridXIntervals}% - ${Math.floor(elem.clientWidth) / 2}px)`;
    });

    // Position Y Axis Lines 
    let longestValue = 0;
    gridYElems.forEach((elem, i) => {
        elem.style.top = `calc(${i * gridYIntervals}% - ${Math.floor(elem.clientHeight / 2)}px)`;
        let elemValue = elem.querySelector(".value").innerHTML;
        if (elemValue.length > longestValue) longestValue = elemValue.length;
    });

    // Set Height and Width Properties
    graphBox.style.setProperty("--height", (gridYElems.length * 3) + "ch");
    graphSec.style.setProperty("--value-width", longestValue + "ch");

    if (type == GRAPH_TYPE.positional) {
        setdataPoints(dataPoints, axisX, axisY, graphHolder);
    } else if (type == GRAPH_TYPE.waveform) {
        setWaveLines(dataPoints, axisX, axisY, indexItems[0], graphHolder);
    }
}

// Setting Data Points on the graph
function setdataPoints(dataPoints, axisX, axisY, graphHolder) {
    // Create Data Point holder element
    let dataPointHolder = document.createElement("div");
    dataPointHolder.classList.add("data-point-holder");
    graphHolder.append(dataPointHolder);

    // For Each Data Point in the Array
    dataPoints.forEach(point => {
        // Creating a Data Point and append to dataPointHolder
        let dataPointElem = document.createElement("span");
        dataPointElem.classList.add("data-point");
        if (point.icon) dataPointElem.innerHTML = `<i class="bi bi-${point.icon}"></i>`;
        dataPointHolder.append(dataPointElem);

        // Creating corresponding tooltip and append to dataPointHolder
        let tooltipElem = document.createElement("span");
        tooltipElem.classList.add("data-point-tooltip");
        tooltipElem.innerHTML = `
        <div class="label">${point.label}</div>
        <div class="subtitle">x:${point.x}, y:${point.y}</div>`;
        dataPointHolder.append(tooltipElem);

        // Set color to Point
        dataPointElem.style.setProperty("--clr-index", point.color);

        // Positioning the Data Point and it's tooltip
        const [xPercentage, yPercentage] = getCoordinatePercentages(point.x, point.y, axisX, axisY);
        dataPointElem.style.setProperty("--x-percentage", xPercentage + "%");
        dataPointElem.style.setProperty("--y-percentage", yPercentage + "%");
        tooltipElem.style.setProperty("--x-percentage", xPercentage + "%");

        // Tooltip and Point Selection Event
        dataPointElem.addEventListener("click", () => {
            dataPointElem.classList.toggle("selected");
            tooltipElem.classList.toggle("visible");
        });
    });
}

// FUNCTION to Create Waveform Lines and Set them to graph
function setWaveLines(dataPoints, axisX, axisY, indexItems, graphHolder) {
    if (dataPoints.length === 0) return;


    // Create dot point holder element
    let dataPointHolder = document.createElement("div");
    dataPointHolder.classList.add("data-point-holder");
    graphHolder.append(dataPointHolder);

    for (let i = 0; i < dataPoints.length - 1; i++) {
        const point = dataPoints[i];
        // Get Line Length
        let [x1Percentage, y1Percentage] = getCoordinatePercentages(point[0], point[1], axisX, axisY);
        let [x2Percentage, y2Percentage] = getCoordinatePercentages(dataPoints[i + 1][0], dataPoints[i + 1][1], axisX, axisY);

        x1Percentage = parseFloat(x1Percentage.toFixed(100));
        y1Percentage = parseFloat(y1Percentage.toFixed(100));
        x2Percentage = parseFloat(x2Percentage.toFixed(100));
        y2Percentage = parseFloat(y2Percentage.toFixed(100));

        // dataPointHolder.innerHTML += `
        // <line x1="${x1Percentage}%" y1="${y1Percentage}%" x2="${x2Percentage}%" y2="${y2Percentage}%" stroke="red" fill="none" stroke-width="1"></line>
        // `

        // console.log(
        //     "\n",
        //     "x1-" + x1Percentage, 
        //     "y1-" + y1Percentage,
        //     "\n",
        //     "x2-" + x1Percentage, 
        //     "y2-" + y1Percentage
        // );
        // console.log((y2Percentage - y1Percentage).toString().replace('e-', ''));


        let lineBox = document.createElement("span");
        lineBox.classList.add("linebox")
        lineBox.style.width = `${x2Percentage - x1Percentage}%`;
        lineBox.style.height = `${(y2Percentage - y1Percentage).toString().replace('e-', '')}%`;
        lineBox.style.setProperty("--x-percentage", x1Percentage + "%");
        lineBox.style.setProperty("--y-percentage", y1Percentage + "%");
        lineBox.style.setProperty("--clr-index", indexItems.color);
        if (y1Percentage > y2Percentage) {
            lineBox.classList.add("downwards")
            lineBox.style.height = `${(y1Percentage - y2Percentage).toString().replace('e-', '')}%`;
            lineBox.style.setProperty("--y-percentage", y2Percentage + "%");
        }
        dataPointHolder.append(lineBox)
    }
}