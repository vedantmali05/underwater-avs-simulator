"use strict"

import {
    UI_SIZE,
    UI_STATUS_FEEDBACK,
} from "./components/data.js";

import { createDialog, createSnackbar, refreshInputs } from "./components/utils.js";

document.addEventListener("DOMContentLoaded", function () {

    /* ///////////////
        SNACKBAR
    /////////////// */

    let snackbarSec = this.createElement("section");
    snackbarSec.classList.add("snackbar-sec");
    this.body.prepend(snackbarSec);

    createSnackbar({ msg: "Cancelled" })

    /* ///////////////
        POPULATE LOGO
    /////////////// */
    let pictureLogoArr = this.querySelectorAll(".logo");

    pictureLogoArr.forEach(logo => {
        let img = this.createElement("img");
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
        if (logo.getAttribute("data-name") == "true") {
            let logoName = this.createElement("p");
            logoName.innerHTML = `Habisphere`;
            logo.appendChild(logoName)
        }
        logo.appendChild(img);
    });


    /* ///////////////
    POPULATE INPUT CLASSES and HANDLE UI EFFECTS
    /////////////// */
    refreshInputs();

});