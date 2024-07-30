import { contextBridge, ipcRenderer } from "electron";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
if (process.contextIsolated) {
  try {
    await contextBridge.exposeInMainWorld("versions", {
      node: () => process.versions.node,
      chrome: () => process.versions.chrome,
      electron: () => process.versions.electron,
      ping: () => ipcRenderer.invoke("ping")
      // we can also expose variables, not just functions
    });
    await contextBridge.exposeInMainWorld("darkMode", {
      toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
      system: () => ipcRenderer.invoke("dark-mode:system")
    });
  } catch (error) {
    console.error(error);
  }
}
