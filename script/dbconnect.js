const mysql = require('mysql');
const { ipcRenderer } = require('electron');

var con = mysql.createConnection({
    host: "86.234.96.174",
    user: "user",
    password: "user",
    database: "cranebreaker"
});

con.connect(function (err) {
    if (err) throw err;
    store.set('connected', 'true');
    const isCon = store.get('connected');
    if (isCon == 'true') {
        console.log(isCon);
    }
});

$query = 'SELECT * FROM `user` LIMIT 10';

$scorequery = 'SELECT level_id, level_highscore FROM levels LIMIT 10';

// Récupération high scores


const test = function getHighScores() {
    con.query($scorequery, function (err, rows) {
        if (err) throw err;

        ipcRenderer.send('bar', "I did something for you");

        // const tab = document.getElementById("tab");
        // tab.innerHTML = '2';
        // const levelnbr = document.getElementById("levelnbr");
        // levelnbr.innerHTML = '3';

        // console.log('woohoo', rows);
    });
};

con.query($query, function (err, rows) {
    if (err) throw err;

    console.log("Query succesfully executed", rows);
});