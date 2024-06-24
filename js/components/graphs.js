// IMPORTS
import { GRAPH_TYPE } from "./data.js"


/* ///////////////
    CLASS TEMPLATE FOR GRAPH
/////////////// */

// Graph Button Controls
const graphControls = {
    zoomIn: true,
    zoomOut: true,
    pan: true,
    saveAsPDF: true,
    clearGraph: true,
}

// Graph's Index Item
class GraphIndexItem {
    constructor(label, type, color = ``, icon = null) {
        this.label = label;
        this.type = type;
        this.color = color;
        this.icon = icon;
    }
}

// Graph Dot Point
class GraphDotPoint {
    constructor(dotProperties, x, y) {
        this.label = dotProperties.label;
        this.color = dotProperties.color;
        this.icon = dotProperties.icon;
        this.x = x;
        this.y = y;
    }
}

// Graph's X Axis and Y Axis
class GraphAxis {
    constructor(label, pointDifference, maxPoint) {
        this.label = label;
        this.originPoint = 0;
        this.centeredOrigin = false;
        this.pointDifference = pointDifference;
        this.maxPoint = maxPoint;
    }
}

class GraphAxisX extends GraphAxis {
    constructor(label, pointDifference, maxPoint) {
        super(label, pointDifference, maxPoint);
    }
}

class GraphAxisY extends GraphAxis {
    constructor(label, pointDifference, maxPoint) {
        super(label, pointDifference, maxPoint);
    }
}


class Graph {
    constructor(parentID, title, description, type) {
        this.parentID = parentID;
        this.title = title;
        this.description = description;
        this.type = type;
        this.controls = graphControls;
        this.indexItems = {};
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

    addDotPoints(dotPoint) {
        if (this.type == GRAPH_TYPE.positional) {
            this.dotPoints.push(dotPoint);
        }
    }
}


/* ///////////////
    CREATE GRAPH FUNCTION
/////////////// */

export function createGraph(options = {}) {

    const {
        parentID,
        title,
        description,
        controls = {},
        indexItems = [],
        axisX = {},
        axisY = {},
        type,
    } = options;


}