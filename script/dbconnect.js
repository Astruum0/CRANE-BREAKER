const mysql = require('mysql');
const Store = require('electron-store'), store = new Store();
const { Sequelize } = require('sequelize');

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

function getHighScores() {
    con.query($scorequery, function (err, rows) {
        if (err) throw err;

        const tab = document.getElementById("tab");
        const leveln = document.getElementById("levelnbr");

        console.log(rows);
    });
};

con.query($query, function (err, rows) {
    if (err) throw err;

    console.log("Query succesfully executed", rows);
});

module.exports = isCon = store.get('connected');