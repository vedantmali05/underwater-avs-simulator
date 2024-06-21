"use strict"

import {
    UI_CLASSES,
    UI_SIZE,
    UI_STATUS_FEEDBACK,
} from "./components/data.js";

import { createDialog, createSnackbar, getParentElement, refreshInputs } from "./components/utils.js";

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
    let textElementsArr = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");

    textElementsArr.forEach(elem => {
        elem.setAttribute("title", elem.innerText);
    })

    /* ///////////////
        SIDEBARs OPENING AND CLOSING
    /////////////// */

    // Input Aside
    let asideElementsArray = [document.querySelector(".input-aside-open-btn"), document.querySelector(".input-aside-close-btn"), document.querySelector(".input-aside")];

    // Input Aside Open Button Click
    asideElementsArray[0].addEventListener("click", () => {
        asideElementsArray.forEach(elem => elem.classList.add("aside-visible"));
    });

    // Input Aside Close Button Click
    asideElementsArray[1].addEventListener("click", () => {
        asideElementsArray.forEach(elem => elem.classList.remove("aside-visible"));
    });

    // Input Aside Scrim Click - Close Aside
    asideElementsArray[2].addEventListener('click', (e) => {
        if (!e.target.closest(".aside-body")) {
            asideElementsArray.forEach(elem => elem.classList.remove("aside-visible"));
        }
    });

    // Navigation bar
    let navElementArray = [document.querySelector(".nav-open-btn"), document.querySelector(".nav-close-btn"), document.querySelector("nav")];

    // Navigation bar Open Button Click
    navElementArray[0].addEventListener("click", () => {
        navElementArray.forEach(elem => elem.classList.add("nav-visible"));
    });

    // Navigation bar Close Button Click
    navElementArray[1].addEventListener("click", () => {
        navElementArray.forEach(elem => elem.classList.remove("nav-visible"));
    });

    // Navigation bar Scrim Click - Close nav
    navElementArray[2].addEventListener('click', (e) => {
        if (!e.target.closest(".nav-body")) {
            navElementArray.forEach(elem => elem.classList.remove("nav-visible"));
        }
    });
});