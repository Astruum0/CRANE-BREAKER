//////// SETUP /////////
const electron = require("electron");
const url = require("url");
const path = require("path");
const db = require("./script/preload");
const { ipcMain } = require('electron');
const { app, BrowserWindow } = electron;
let timerWindow;

////////////////////////////////////////////

//////// START WINDOW WITH OPTIONS /////////

app.on("ready", async () => {
    timerWindow = new BrowserWindow({
        titleBarStyle: "hidden", minWidth: 600, minHeight: 900, icon: 'img/appicon.ico', webPreferences: {
            nodeIntegration: true, // NECESSARY ! FOR NODE REQUIRE
            enableRemoteModule: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'script/preload.js')
        }
    });

    timerWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "views", "intro.html"),
            protocol: "file",
            slashes: true,
        })
    );

    ipcMain.on('close-me', (evt, arg) => {
        app.quit()
    })

    // Enable renderer console
    //timerWindow.openDevTools();
    timerWindow.removeMenu();
    timerWindow.maximize(); // Both lines used for hiding bar
});