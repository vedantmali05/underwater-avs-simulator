// Dependencies Requirements
const { app, BrowserWindow, screen, Menu, ipcMain, ipcRenderer } = require('electron')
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
        sendToRenderer(MAIN_WIN, PATH_INPUTS, FUNC_NAMES.fetchInputData);
        sendToRenderer(MAIN_WIN, PATH_INPUTS_HISTORY, FUNC_NAMES.fetchInputHistory);
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
            data = data ? JSON.parse(data) : [];
            window.webContents.send(funcName, data);
        }
    }, 1500);
}

// FUNCTION to UPDATE INPUT HISTORY
function updateInputHistory(data, overwrite = false) {
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
        updatedData = removeDuplicateHistory(updatedData);
    }
    fs.writeFileSync(PATH_INPUTS_HISTORY, JSON.stringify(updatedData));
    sendToRenderer(MAIN_WIN, PATH_INPUTS_HISTORY, FUNC_NAMES.fetchInputHistory)
}

// Remove Duplicate Input History
function removeDuplicateHistory(arr) {
    const seen = new Set();
    const uniqueArray = [];

    for (const obj of arr) {
        // Create a unique key combining the object's properties (excluding "recordtime").
        const uniqueKey = JSON.stringify(Object.assign({}, obj, { recordTime: null }));

        if (!seen.has(uniqueKey)) {
            seen.add(uniqueKey);
            uniqueArray.push(obj);
        }
    }

    return uniqueArray;
}

// Built App
app.whenReady().then(() => {
    MAIN_WIN = createMainWindow();
});

// Save Inputs
ipcMain.on("input:save-data", async function (e, data) {

    // If db (database) folder doesn't exists, create one,
    if (!fs.existsSync("./db")) fs.mkdirSync("./db");

    updateInputHistory(data);

    // Save current data
    fs.writeFileSync(PATH_INPUTS, JSON.stringify(data));
    sendToRenderer(MAIN_WIN, PATH_INPUTS, FUNC_NAMES.fetchInputData);

    MAIN_WIN.loadFile("avs-calculations.html");
});

// Clearing Inputs and STARTING OVER
ipcMain.on("input:reset", async (e, data) => {
    fs.writeFileSync(PATH_INPUTS, '');
    MAIN_WIN.loadFile("index.html");
})

// When a Input From INPUT HISTORY IS SELECTED, IT IS MOVED TO FIRST LOCATION
ipcMain.on("history:selected", async (e, data) => {
    updateInputHistory(data, true);
    sendToRenderer(MAIN_WIN, PATH_INPUTS_HISTORY, FUNC_NAMES.fillDataFromHistory)
});

// Clear History button clicked
ipcMain.on("history:clear", async (e, data) => {
    updateInputHistory([], true);
})
