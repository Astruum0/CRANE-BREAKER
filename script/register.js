const { localStorage, sessionStorage } = require('electron-browser-storage');
const sessionID = sessionStorage.setItem('sessionID', 'null')
    .then(() => sessionStorage.getItem('sessionID'))
console.log(sessionID);