// const { app, BrowserWindow, nativeImage, Tray, ipcMain, nativeTheme } = require('electron/main')
// const path = require('node:path')


import { app, BrowserWindow, nativeImage, Tray, ipcMain, nativeTheme } from 'electron/main'
import path from 'path'


app.disableHardwareAcceleration()
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

const appIcon = nativeImage.createFromPath('./assets/images/icon.png')

const description = "The Hamilton Labs App"

let winDimensions;

app.whenReady().then(() => {
    const trayIcon = nativeImage.createFromPath('./assets/images/icon.png')
    ipcMain.handle('ping', () => 'pong')
    const tray = new Tray(trayIcon)
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
})

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: appIcon,
    images: true,
    frame: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: false,
      preload: path.join(app.getAppPath(), './src/preload/preload.mjs')
    }
  })

  // winDimensions = new BrowserWindow({
  //   width: 1920,
  //   height: 1080,
  //   icon: appIcon,
  //   images: true,
  //   frame: true,
  //   show: false,
  //   webPreferences: {
  //     nodeIntegration: false,
  //     contextIsolation: true,
  //     enableRemoteModule: false,
  //     sandbox: false,
  //     protocol: 'file',
  //     preload: path.join(app.getAppPath(), './src/preload/preload.mjs')
  //   }
  // })

  win.setOverlayIcon(nativeImage.createFromPath('./assets/images/Green-Alert-PNG.png'), description)
  
    win.loadFile(path.join(app.getAppPath(), './index.html'))

    // winDimensions.setOverlayIcon(nativeImage.createFromPath('./images/Green-Alert-PNG.png'), description)

    // winDimensions.loadFile(path.join(app.getAppPath(), './src/renderer/index.html'))

    win.once('ready-to-show', () => {
      win.show();
    })

    // winDimensions.once('ready-to-show', () => {
    //   winDimensions.show();
    // })
} 

console.log('Loading The Hamilton Labs Apps')