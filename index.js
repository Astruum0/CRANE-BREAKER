// Basic imports
const electron = require("electron");
const url = require("url");
const path = require("path");
const db = require("./script/preload");
const { ipcMain } = require('electron');
const { net } = require('electron');

const { app, BrowserWindow } = electron;

let timerWindow;
let settingsWindow;

app.on("ready", async () => {
    timerWindow = new BrowserWindow({
        titleBarStyle: "hidden", minWidth: 600, minHeight: 800, icon: 'img/appicon.ico', webPreferences: {
            nodeIntegration: true, // NECESSARY ! FOR NODE REQUIRE
            contextIsolation: false,
        }
    });

    timerWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "views", "register.html"),
            protocol: "file",
            slashes: true,
        })
    );

    ipcMain.on('close-me', (evt, arg) => {
        app.quit()
    })


    timerWindow.openDevTools();
    timerWindow.removeMenu();
    timerWindow.maximize();
});

ipcMain.on('login-submission', function (event, username, password) {
    console.log("this is the firstname from the form ->", username, password)
});