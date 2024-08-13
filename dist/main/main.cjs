"use strict";
const main = require("electron/main");
const path = require("path");
main.app.disableHardwareAcceleration();
main.app.commandLine.appendSwitch("ignore-gpu-blacklist");
main.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") main.app.quit();
});
const appIcon = main.nativeImage.createFromPath("./assets/images/icon.png");
const description = "The Hamilton Labs App";
main.app.whenReady().then(() => {
  const trayIcon = main.nativeImage.createFromPath("./assets/images/icon.png");
  main.ipcMain.handle("ping", () => "pong");
  new main.Tray(trayIcon);
  createWindow();
  main.app.on("activate", () => {
    if (main.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
main.ipcMain.handle("dark-mode:toggle", () => {
  if (main.nativeTheme.shouldUseDarkColors) {
    main.nativeTheme.themeSource = "light";
  } else {
    main.nativeTheme.themeSource = "dark";
  }
  return main.nativeTheme.shouldUseDarkColors;
});
main.ipcMain.handle("dark-mode:system", () => {
  main.nativeTheme.themeSource = "system";
});
const createWindow = () => {
  const win = new main.BrowserWindow({
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
      preload: path.join(main.app.getAppPath(), "./src/preload/preload.mjs")
    }
  });
  win.setOverlayIcon(main.nativeImage.createFromPath("./assets/images/Green-Alert-PNG.png"), description);
  win.loadFile(path.join(main.app.getAppPath(), "./index.html"));
  win.once("ready-to-show", () => {
    win.show();
  });
};
console.log("Loading The Hamilton Labs Apps");
