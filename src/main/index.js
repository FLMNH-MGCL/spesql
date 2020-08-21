import path from "path";
import url from "url";
import { app, BrowserWindow } from "electron";
import is from "electron-is";
import { menubar, Menubar } from "menubar";
import { autoUpdater } from "electron-updater";
import "./server/server";

autoUpdater.checkForUpdatesAndNotify();

app.commandLine.appendSwitch("ignore-certificate-errors");

let win = null;

app.on("ready", () => {
  win = new BrowserWindow({
    width: 1600,
    height: 980,
    webPreferences: {
      nodeIntegration: true,
    },
    showOnAllWorkspaces: false,
    title: "Electron App",
  });

  if (is.dev()) {
    console.log("THIS IS THE PORT", process.env.ELECTRON_WEBPACK_WDS_PORT);
    win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
    // win.webContents.openDevTools();
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }
});

app.on("window-all-closed", (event) => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
