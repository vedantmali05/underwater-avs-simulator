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

// Graph Dot Point
export class GraphDotPoint {
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
    constructor(label, pointDifference, maxPoint) {
        this.label = label;
        this.originPoint = 0;
        this.centeredOrigin = false;
        this.pointDifference = pointDifference;
        this.maxPoint = maxPoint;
    }
}

export class GraphAxisX extends GraphAxis {
    constructor(label, pointDifference, maxPoint) {
        super(label, pointDifference, maxPoint);
    }
}

export class GraphAxisY extends GraphAxis {
    constructor(label, pointDifference, maxPoint) {
        super(label, pointDifference, maxPoint);
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
        this.dotPoints = [];
    }

    setAxis(axisX, axisY) {
        this.axisX = axisX;
        this.axisY = axisY;
    }

    addIndexItems(indexItem) {
        this.indexItems = this.indexItems.concat(indexItem);
    }

    addDotPoints(dotPoint) {
        if (this.type == GRAPH_TYPE.positional) {
            this.dotPoints = this.dotPoints.concat(dotPoint);
        }
    }
}


/* ///////////////
    CREATE GRAPH FUNCTION
/////////////// */

// Create the TITLE SECTION of the Graph
function createGraphTitleSec(title, description, controls) {
    // Create the title section element
    let titleSec = document.createElement("div");
    titleSec.classList.add("title-sec");

    // Build the HTML content with template literals
    titleSec.innerHTML = `
        <h3>${title}</h3>
        ${description ? `<p class="subtitle">${description}</p>` : ``}
        <div class="controls-box">
            ${controls.clearGraph ?
            `<button class="icon negative control-clear-graph"><i class="bi bi-trash"></i></button>` : ``}  
            ${controls.saveAsPDF ?
            `<button class="icon control-save-as-pdf"><i class="bi bi-filetype-pdf"></i></button>` : ``}
            ${controls.pan ?
            `<button class="icon control-pan"><i class="bi bi-arrows-move"></i></button>` : ``}
            ${controls.zoom ?
            `<button class="icon control-zoom-in"><i class="bi bi-zoom-in"></i></button>
             <span>Zoom</span>
             <button class="icon control-zoom-out"><i class="bi bi-zoom-out"></i></button>` : ``}
        </div>
    `;

    // Return to append
    return titleSec;
}

// Create the INDEX SECTION of the Graph
function createGraphIndexSec(indexItems) {
    // Create the index section element
    let indexSec = document.createElement("div");
    indexSec.classList.add("index-sec");

    // Build the index items HTML string
    let indexItemsHTML = ``;
    indexItems.forEach(item => {
        indexItemsHTML += `
        <li class="index-item" style="--clr-index: ${item.color}">
            <span class="index-symbol ${item.type}">
            ${item.icon ? `<i class="bi bi-${item.icon}"></i>` : ``}
            </span> 
            ${item.label}
        </li>
        `;
    });

    indexSec.innerHTML = `
        <p>Index</p>
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
        if (!Number.isInteger(i)) i = i.toFixed(4);
        // Create and append the grid lines
        let gridLine = document.createElement("span");
        gridLine.innerHTML = `<span class="value">${i}</span><span class="line"></span><span class="point"></span>`;
        gridLine.classList.add(`grid-line-${axisType}`);
        if (axisType == GRAPH_AXIS_TYPE.x)
            holder.append(gridLine);
        else
            holder.prepend(gridLine);
    }
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
        axisX,
        axisY,
        dotPoints,
    } = options;


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
        createGraphTitleSec(title, description, controls),
        graphBox,
        createGraphIndexSec(indexItems)
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
        setDotPoints(dotPoints, axisX, axisY, graphHolder);
    }
}

// Setting Dot Points on the graph
function setDotPoints(dotPoints, axisX, axisY, graphHolder) {
    // Create dot point holder element
    let dotPointHolder = document.createElement("div");
    dotPointHolder.classList.add("dot-point-holder");
    graphHolder.append(dotPointHolder);

    // For Each Dot Point in the Array
    dotPoints.forEach(point => {
        // Creating a Dot Point and append to dotPointHolder
        let dotPointElem = document.createElement("span");
        dotPointElem.classList.add("dot-point");
        if (point.icon) dotPointElem.innerHTML = `<i class="bi bi-${point.icon}"></i>`;
        dotPointHolder.append(dotPointElem);

        // Creating corresponding tooltip and append to dotPointHolder
        let tooltipElem = document.createElement("span");
        tooltipElem.classList.add("dot-point-tooltip");
        tooltipElem.innerHTML = `
        <div class="label">${point.label}</div>
        <div class="subtitle">x:${point.x}, y:${point.y}</div>`;
        dotPointHolder.append(tooltipElem);

        // Set color to Point
        dotPointElem.style.setProperty("--clr-point", point.color);

        // Positioning the Dot Point and it's tooltip
        const [xPercentage, yPercentage] = getCoordinatePercentages(point.x, point.y, axisX, axisY);
        dotPointElem.style.setProperty("--x-percentage", xPercentage + "%");
        dotPointElem.style.setProperty("--y-percentage", yPercentage + "%");
        tooltipElem.style.setProperty("--x-percentage", xPercentage + "%");

        // Tooltip and Point Selection Event
        dotPointElem.addEventListener("click", () => {
            dotPointElem.classList.toggle("selected");
            tooltipElem.classList.toggle("visible");
        });
    });
}