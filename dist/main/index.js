import { app, nativeImage, ipcMain, Tray, BrowserWindow, nativeTheme } from "electron/main";
import path from "path";
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
const appIcon = nativeImage.createFromPath("./src/renderer/images/icon.png");
const description = "The Hamilton Labs App";
app.whenReady().then(() => {
  const trayIcon = nativeImage.createFromPath("./images/icon.png");
  ipcMain.handle("ping", () => "pong");
  new Tray(trayIcon);
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
ipcMain.handle("dark-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.shouldUseDarkColors;
});
ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system";
});
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: appIcon,
    images: true,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      sandbox: false,
      preload: path.join(app.getAppPath(), "./src/preload/preload.mjs")
    }
  });
  win.setOverlayIcon(nativeImage.createFromPath("./images/Green-Alert-PNG.png"), description);
  if (!app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(path.join(app.getAppPath(), "./src/renderer/index.html"));
  }
};
console.log("Loading The Hamilton Labs Apps");
