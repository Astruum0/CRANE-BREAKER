const electron = require("electron");
const url = require("url");
const path = require("path");

const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const { app, BrowserWindow } = electron;

let timerWindow;
let settingsWindow;

function redirection(link) {
    window.location.replace(link);
}

app.on("ready", async () => {
    timerWindow = new BrowserWindow({
        titleBarStyle: "hidden", minWidth: 600, minHeight: 800, icon: 'img/appicon.ico',
        webPreferences: {
            preload: `file://${__dirname}/scripts/*.js`,
        }
    })
});
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

app.on('bar', (event, arg) => {
    console.log("woohoo")  // prints "I did something for you"
    event.sender.send('foo', 'done') // You can also send a message like that
})