"use strict"

import {
    UI_COLORS,
    UI_CLASSES,
    UI_SIZE,
    UI_STATUS_FEEDBACK,
    GRAPH_INDEX_ITEM_TYPE,
    GRAPH_TYPE
} from "./components/data.js";

import { createDialog, createSnackbar } from "./components/utils.js";
import { getParentElement, refreshInputs } from "./components/utils.js";
import { GraphControls, GraphIndexItem, GraphAxisX, GraphAxisY, GraphDotPoint, Graph, createGraph } from "./components/graphs.js";

document.addEventListener("DOMContentLoaded", () => {

    /* ///////////////
        SNACKBAR
    /////////////// */

    let snackbarSec = document.createElement("section");
    snackbarSec.classList.add("snackbar-sec");
    document.body.prepend(snackbarSec);

    /* ///////////////
        POPULATE LOGO
    /////////////// */
    let pictureLogoArr = document.querySelectorAll(".logo");

    pictureLogoArr.forEach(logo => {
        let img = document.createElement("img");
        img.src = "./assets/logo/logo.svg";
        switch (logo.getAttribute("data-size")) {
            case UI_SIZE.xs:
                img.style.width = "3.2rem";
                break;
            case UI_SIZE.s:
                img.style.width = "4.8rem";
                break;
            default: case UI_SIZE.m:
                img.style.width = "6.4rem";
                break;
            case UI_SIZE.l:
                img.style.width = "8rem";

                break;
            case UI_SIZE.xl:
                img.style.width = "9.6rem";

                break;
        }
        logo.appendChild(img);
    });


    /* ///////////////
    POPULATE INPUT CLASSES and HANDLE UI EFFECTS
    /////////////// */
    refreshInputs();

    // Clearing Search box on click
    let clearSearchBtnsArr = document.querySelectorAll(".clear-search");

    clearSearchBtnsArr.forEach(elem => {
        elem.addEventListener('click', () => {
            let parent = getParentElement(elem, UI_CLASSES.fieldset);
            parent.querySelector("[type='text']").value = ``;
        });
    });

    /* ///////////////
        Typography and Accessibility
    /////////////// */
    let textElementsArr = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, th, td");

    textElementsArr.forEach(elem => {
        elem.setAttribute("title", elem.innerText);
    })

    /* ///////////////
        SIDEBARs OPENING AND CLOSING
    /////////////// */

    // Input Aside
    let asideElementsArray = [document.querySelector(".input-aside-open-btn"), document.querySelector(".input-aside-close-btn"), document.querySelector(".input-aside")];

    // Input Aside Open Button Click
    asideElementsArray[0]?.addEventListener("click", () => {
        asideElementsArray.forEach(elem => elem.classList.add("aside-visible"));
    });

    // Input Aside Close Button Click
    asideElementsArray[1]?.addEventListener("click", () => {
        asideElementsArray.forEach(elem => elem.classList.remove("aside-visible"));
    });

    // Input Aside Scrim Click - Close Aside
    asideElementsArray[2]?.addEventListener('click', (e) => {
        if (!e.target.closest(".aside-body")) {
            asideElementsArray.forEach(elem => elem.classList.remove("aside-visible"));
        }
    });

    // Navigation bar
    let navElementArray = [document.querySelector(".nav-open-btn"), document.querySelector(".nav-close-btn"), document.querySelector("nav")];

    // Navigation bar Open Button Click
    navElementArray[0]?.addEventListener("click", () => {
        navElementArray.forEach(elem => elem.classList.add("nav-visible"));
    });

    // Navigation bar Close Button Click
    navElementArray[1]?.addEventListener("click", () => {
        navElementArray.forEach(elem => elem.classList.remove("nav-visible"));
    });

    // Navigation bar Scrim Click - Close nav
    navElementArray[2]?.addEventListener('click', (e) => {
        if (!e.target.closest(".nav-body")) {
            navElementArray.forEach(elem => elem.classList.remove("nav-visible"));
        }
    });

    /* ///////////////
        DISPLAY DATA
    /////////////// */

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

    for (const [key, value] of Object.entries(SOURCE_DATA)) {
        let elem = document.getElementById(`source_data_${key}`);
        if (elem) elem.innerHTML = value;
    }

    // POPULATING GRAPH
    // Graph Items
    let graphIndexItems = [
        new GraphIndexItem("Item 1", GRAPH_INDEX_ITEM_TYPE.dot, UI_COLORS.primary.base),
        new GraphIndexItem("Item 2", GRAPH_INDEX_ITEM_TYPE.dot, UI_COLORS.accent.base),
        new GraphIndexItem("Item 3", GRAPH_INDEX_ITEM_TYPE.icon, UI_COLORS.accent.hover, `crosshair`),
    ];
    // Dot Points
    let graphDotPoints = [
        new GraphDotPoint(graphIndexItems[0], 100, 100),
        new GraphDotPoint(graphIndexItems[1], 200, 200),
        new GraphDotPoint(graphIndexItems[2], 210, 210)
    ];
    // X and Y Axis
    let graphAxisX = new GraphAxisX("Distance (meters)", 100, 500);
    let graphAxisY = new GraphAxisY("Time (seconds)", 100, 500);
    // graphAxisX.centeredOrigin = true;
    
    // Graph Settings
    let graph = new Graph("graph_example", "Example Graph", "This graph is meow cheow", GRAPH_TYPE.positional);
    graph.addDotPoints(graphDotPoints);
    graph.addIndexItems(graphIndexItems);
    graph.setAxis(graphAxisX, graphAxisY);

    // Create Graph
    createGraph(graph);
});