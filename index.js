const electron = require("electron");
const url = require("url");
const path = require("path");
const db = require("./script/preload")
const reg = require("./script/register")
// const log = require("./script/login")
var express = require('express');
var session = require('express-session');
const { net } = require('electron');


const { app, BrowserWindow } = electron;

let timerWindow;
let settingsWindow;

app.on("ready", async () => {
    timerWindow = new BrowserWindow({
        titleBarStyle: "hidden", minWidth: 600, minHeight: 800, icon: 'img/appicon.ico', webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    // net.request.on('login', (authInfo, callback) => {
    //     callback('username', 'password')
    // })

    timerWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "views", "scores.html"),
            protocol: "file",
            slashes: true,
        })
    );

    timerWindow.openDevTools();
    timerWindow.removeMenu();
    timerWindow.maximize();
});