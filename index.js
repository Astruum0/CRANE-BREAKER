const electron = require("electron");
const url = require("url");
const path = require("path");
const dbCon = require("./script/dbconnect")

const { app, BrowserWindow } = electron;

let timerWindow;
let settingsWindow;

function redirection(link) {
    window.location.replace(link);
}

app.on("ready", async () => {
    timerWindow = new BrowserWindow({ titleBarStyle: "hidden", minWidth: 600, minHeight: 800, icon: 'img/appicon.ico' });
    timerWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "views", "index.html"),
            protocol: "file",
            slashes: true,
        })
    );

    timerWindow.removeMenu();
    timerWindow.maximize();
});