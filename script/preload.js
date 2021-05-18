const mysql = require('mysql');
const Store = require('electron-store');
const store = new Store();

// Vars
const isCon = store.get('connected');
var maxplayerresult;

// Querys
const userquery = 'SELECT * FROM `user` LIMIT 10';
const scorequery = 'SELECT * FROM `scores` LIMIT 10';
const maxplayersquery = "SELECT COUNT(user_id) AS 'countresult' FROM `scores`"

con = mysql.createConnection({
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

function getScores() {
    con.query(userquery, function (err, result) {
        if (err) throw err;

        Object.keys(result).forEach(function (key) {
            let row = result[key];
            usernbr = row.username;
        });
    });

    con.query(maxplayersquery, function (err, result) {
        if (err) throw err;

        Object.keys(result).forEach(function (key) {
            let row = result[key];
            maxplayerresult = row.countresult;
        });
    });

    // Récupération high scores
    con.query(scorequery, function (err, result) {
        if (err) throw err;
        // get the reference for the body
        var body = document.getElementsByTagName("body")[0];

        var tbl = document.createElement("table");
        tbl.classList.add("text-center");
        var tblhead = document.createElement("thead");
        body.appendChild(tbl);

        // Header tableau
        var trhead = document.createElement("tr");

        var th1 = document.createElement("th");
        var thjoueur = document.createTextNode("Joueur");
        th1.appendChild(thjoueur);

        var th2 = document.createElement("th");
        var thlvl = document.createTextNode("Score total");
        th2.appendChild(thlvl);

        var th3 = document.createElement("th");
        var th5best = document.createTextNode("5 meilleures parties");
        th3.appendChild(th5best);

        tblhead.appendChild(th1);
        tblhead.appendChild(th2);
        tblhead.appendChild(th3);
        //

        var tblBody = document.createElement("tbody");

        tbl.appendChild(tblBody);
        tbl.appendChild(tblhead);
        tbl.setAttribute("border", "2");

        Object.keys(result).forEach(function (key) {
            const scoreresult = result[key];
            var trrow = document.createElement("tr");

            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var text1 = document.createTextNode(scoreresult.username);
            var text2 = document.createTextNode(scoreresult.total_score);
            var text3 = document.createTextNode(scoreresult.best5_score);
            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            trrow.appendChild(td1);
            trrow.appendChild(td2);
            trrow.appendChild(td3);
            tblBody.appendChild(trrow);
        });

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
