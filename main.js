// Dependencies Requirements
const { app, BrowserWindow, screen, Menu, ipcMain, ipcRenderer } = require('electron')
// const reloader = require('electron-reloader')(module, {ignore: [regex_to_config_json]})
const path = require('path')
const os = require('os')
const fs = require('fs')
const { log } = require('console');

// GLOBALS
const ISDEV = process.env.NODE_ENV !== "production";
const PATH_INPUTS = path.join(__dirname, "./db/inputs.json")
const PATH_INPUTS_HISTORY = path.join(__dirname, "./db/inputs-history.json");
const FUNC_NAMES = {
    fetchInputHistory: "fetchInputHistory",
    fetchInputData: "fetchInputData",
    fillDataFromHistory: "fillDataFromHistory",
}
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
        x: 700,
        y: 0,
        icon: "./assets/logo/logo.svg",
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWin.webContents.on('did-finish-load', () => {
        sendToRenderer(MAIN_WIN, PATH_INPUTS_HISTORY, FUNC_NAMES.fetchInputHistory)
        sendToRenderer(MAIN_WIN, PATH_INPUTS, FUNC_NAMES.fetchInputData);
    });

    if (ISDEV) mainWin.webContents.openDevTools();

    mainWin.loadFile('index.html');

    mainWin.setMenu(null);

    return mainWin;
}

// Function to Send Certain Data to Renderer
function sendToRenderer(window, filePath, funcName) {
    setTimeout(() => {
        if (fs.existsSync(filePath)) {
            let data = fs.readFileSync(filePath, "utf8");
            data = data ? JSON.parse(data) : null;
            window.webContents.send(funcName, data);
        }
    }, 1500);
}

// FUNCTION to UPDATE INPUT HISTORY
function updateInputHistory(window, data, overwrite = false) {
    // Checking if Input History File exists or if it is empty, create or initialize by []
    if (!fs.existsSync(PATH_INPUTS_HISTORY) || !fs.readFileSync(PATH_INPUTS_HISTORY, "utf8")) {
        fs.writeFileSync(PATH_INPUTS_HISTORY, '[]');
    }

    // Get, update and save input history data
    let updatedData;
    if (overwrite) {
        updatedData = data;
    } else {
        updatedData = JSON.parse(fs.readFileSync(PATH_INPUTS_HISTORY, "utf8"));
        updatedData.unshift(data);
    }
    fs.writeFileSync(PATH_INPUTS_HISTORY, JSON.stringify(updatedData));
    sendToRenderer(MAIN_WIN, PATH_INPUTS_HISTORY, FUNC_NAMES.fetchInputHistory)
}

// Built App
app.whenReady().then(() => {
    MAIN_WIN = createMainWindow();
});

// Save Inputs
ipcMain.on("input:save-data", async function (e, data) {

    // If db (database) folder doesn't exists, create one,
    if (!fs.existsSync("./db")) fs.mkdirSync("./db");

    updateInputHistory(MAIN_WIN, data);

    // Save current data
    fs.writeFileSync(PATH_INPUTS, JSON.stringify(data));
    sendToRenderer(MAIN_WIN, PATH_INPUTS, FUNC_NAMES.fetchInputData);

    MAIN_WIN.loadFile("avs-calculations.html");
});

// When a Input From INPUT HISTORY IS SELECTED, IT IS MOVED TO FIRST LOCATION
ipcMain.on("history:selected", async function (e, data) {
    updateInputHistory(MAIN_WIN, data, true);
    sendToRenderer(MAIN_WIN, PATH_INPUTS_HISTORY, FUNC_NAMES.fillDataFromHistory)
});