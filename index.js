const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow } = electron;

let timerWindow;
let settingsWindow;

function redirection(link) {
    window.location.replace(link);
}

app.on("ready", () => {
    timerWindow = new BrowserWindow({ titleBarStyle: "hidden" });
    timerWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "views", "index.html"),
            protocol: "file",
            slashes: true,
        })
    );
    timerWindow.maximize();
});