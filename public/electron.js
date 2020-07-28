const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const server = require("./server/server");

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 980,
    icon: __dirname + "../src/flmnhLogo.png",
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
