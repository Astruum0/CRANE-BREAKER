const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow } = electron;

let timerWindow;
let settingsWindow;

app.on("ready", () => {
    timerWindow = new BrowserWindow({ titleBarStyle: "hidden" });
    timerWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "views", "game.html"),
            protocol: "file",
            slashes: true,
        })
    );
    timerWindow.maximize();
});