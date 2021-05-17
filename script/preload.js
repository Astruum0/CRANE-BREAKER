const mysql = require('mysql');
const Store = require('electron-store');
const store = new Store();

// Vars
const isCon = store.get('connected');
console.log(isCon);

// Querys
const userquery = 'SELECT * FROM `user` LIMIT 10';
const scorequery = 'SELECT * FROM `scores` LIMIT 10';
let scoreresult;


var con = mysql.createConnection({
    host: "86.234.96.174",
    user: "user",
    password: "user",
    database: "cranebreaker"
});

// Connexion à la BDD
con.connect(function (err) {
    if (err) throw err;
    store.set('connected', 'true');
});

// Récupération high scores
function getScores() {
    con.query(scorequery, function (err, result) {
        if (err) throw err;

        Object.keys(result).forEach(function (key) {
            scoreresult = result[key];
            var teste = document.getElementById("user_total_score");
            teste.innerHTML = scoreresult.total_score;
            console.log(scoreresult.total_score);
        })
        console.log("Query succesfully executed", result);
    });
}

function displayUsername() {
    var element = document.getElementById("welcome");
    if (isCon == 'true') {
        element.classList.remove("invisible");
    } else {
        element.classList.add("col-4");
    }
}