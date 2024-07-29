import require$$0 from "electron";
var preload = {};
const { contextBridge, ipcRenderer } = require$$0;
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping")
  // we can also expose variables, not just functions
});
contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system")
});
export {
  preload as default
};
