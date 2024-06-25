// IMPORTS
import { GRAPH_TYPE, UI_COLORS } from "./data.js"


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

    setAxisX(axisX) {
        this.axisX = axisX;
    }

    setAxisY(axisY) {
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

    // GRAPH SECTION
    let graphSec = document.getElementById(parentID);

    let graphBox = document.createElement("div");
    graphBox.classList.add("graph-box");

    graphSec.append(
        createGraphTitleSec(title, description, controls),
        graphBox,
        createGraphIndexSec(indexItems)
    );
}