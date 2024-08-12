"use strict";
const electron = require("electron");
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("versions", {
      node: () => process.versions.node,
      chrome: () => process.versions.chrome,
      electron: () => process.versions.electron,
      ping: () => electron.ipcRenderer.invoke("ping")
      // we can also expose variables, not just functions
    });
    electron.contextBridge.exposeInMainWorld("darkMode", {
      toggle: () => electron.ipcRenderer.invoke("dark-mode:toggle"),
      system: () => electron.ipcRenderer.invoke("dark-mode:system")
    });
  } catch (error) {
    console.error(error);
  }
}
