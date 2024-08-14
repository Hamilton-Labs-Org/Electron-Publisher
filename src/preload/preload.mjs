// const { contextBridge, ipcRenderer } = require('electron')
import { contextBridge, ipcRenderer } from 'electron/renderer'
import { electronAPI } from '@electron-toolkit/preload'


if (process.contextIsolated) {
  try {
 contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // we can also expose variables, not just functions
})

 contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})

} catch (error) {
  console.error(error)
}} else {
  window.electron = electronAPI
}
