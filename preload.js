// Dependancies Requirements
const { contextBridge, ipcRenderer } = require("electron");

// Bridging UI process to Main process
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});

// Bridging Main process to UI Process
contextBridge.exposeInMainWorld("indexBridge", {
    fetchInputHistory: (callback) => ipcRenderer.on("fetchInputHistory", (callback)),
    fetchInputData: (callback) => ipcRenderer.on("fetchInputData", (callback)),
    fillDataFromHistory: (callback) => ipcRenderer.on("fillDataFromHistory", (callback)),
})