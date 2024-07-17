"use strict"

import {
    UI_CLASSES,
    UI_SIZE,
} from "./components/data.js";

import { setTitleAttr, createDialog } from "./components/utils.js";
import { getParentElement, refreshInputs } from "./components/utils.js";

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

    // TOGGLE BUTTONS
    let toggleBtnBoxesArr = document.querySelectorAll(".toggle-btn-box");


    toggleBtnBoxesArr.forEach(box => {
        let btnsArr = box.querySelectorAll("button");

        btnsArr.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                btnsArr.forEach(otherBtns => {
                    otherBtns.classList.remove("selected")
                    document.querySelector(`#${otherBtns.getAttribute("data-target-id")}`).classList.remove("visible");
                })
                btn.classList.add("selected");
                document.querySelector(`#${btn.getAttribute("data-target-id")}`).classList.add("visible");
            })
        })
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

    if (window.innerWidth > 1024) {
        navElementArray.forEach(elem => elem?.classList.add("nav-visible"));
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth < 1024) {
            navElementArray.forEach(elem => elem?.classList.remove("nav-visible"));
        } else {
            navElementArray.forEach(elem => elem?.classList.add("nav-visible"));
        }
    })

    // Navigation bar Open Button Click
    navElementArray[0]?.addEventListener("click", () => {
        navElementArray.forEach(elem => elem?.classList.add("nav-visible"));
    });

    // Navigation bar Close Button Click
    navElementArray[1]?.addEventListener("click", () => {
        navElementArray.forEach(elem => elem?.classList.remove("nav-visible"));
    });

    // Navigation bar Scrim Click - Close nav
    navElementArray[2]?.addEventListener('click', (e) => {
        if (!e.target.closest(".nav-body")) {
            navElementArray.forEach(elem => elem?.classList.remove("nav-visible"));
        }
    });

    /* ///////////////
        DISPLAY DATA
    /////////////// */

    // Fetch Input data here from Python
    eel.getFromJSONFile("inputs.json")()
        .then((data) => {
            for (const [key, value] of Object.entries(data)) {
                let elem = document.getElementById(`source_data_${key}`);
                if (elem) elem.innerHTML = value;
            }
            setTitleAttr();
        });


    /* ///////////////
    Typography and Accessibility
    /////////////// */

    setTitleAttr();

    let editDataBtnsArr = document.querySelectorAll(".edit-data-btn");

    editDataBtnsArr.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();


            createDialog({
                headline: "Start over?",
                description: "This action will clear the currently calculated data and plots and navigate you to the empty input page with <b>available input history</b>. Are you sure want to start over?",
                primaryBtnLabel: "Reset Data",
                secondaryBtnLabel: "Keep",
                primaryAction: () => {
                    eel.saveToJSONFile("inputs.json", {});
                    window.location.href = "./index.html";
                    return true;
                },
                danger: true
            });

        })
    })
});