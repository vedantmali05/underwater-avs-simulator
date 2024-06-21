// Dependencies Requirements
const { app, BrowserWindow, ipcMain, screen } = require("electron");
const { path } = require('path');

// GLOBALS
const ISDEV = process.env.NODE_ENV !== "production";
let MAIN_WIN = null;


/* ///////////////
    WINDOW BUILDING AND CREATION
/////////////// */



// FUNCTION to create the MAIN WINDOW
function createMainWindow() {
    let { width, height } = screen.getPrimaryDisplay().workAreaSize;

    width = ISDEV ? 580 : width;

    let mainWin = new BrowserWindow({
        title: "Underwater AVS  Simulator",
        width, height,
        x: 740,
        y: 0,
        icon: "./assets/logo/logo.svg",
    });

    if (ISDEV) mainWin.webContents.openDevTools();

    mainWin.loadFile('index.html');

    return mainWin;
}


// Built App
app.whenReady().then(() => {

    MAIN_WIN = createMainWindow();


})