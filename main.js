const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main')
const path = require('node:path')

app.disableHardwareAcceleration()
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
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
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

console.log('Hello from Electron 👋🏾')