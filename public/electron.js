const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const server = require("./server/server");
const path = require("path");
const url = require("url");

const iconUrl = url.format({
  pathname: path.join(__dirname, "icon/icon.icns"),
  protocol: "file",
  slashes: true,
});

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 980,
    icon: iconUrl,
  });

  mainWindow.loadURL(`http:localhost:5000`);
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
