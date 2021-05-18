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
let con;

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
    console.log("connecté bddd");
});

function getScores() {
    // Récupération high scores
    con.query(scorequery, function (err, result) {
        if (err) throw err;
        // get the reference for the body
        var body = document.getElementsByTagName("body")[0];

        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        Object.keys(result).forEach(function (key) {
            scoreresult = result[key];
            // creating all cells
            for (var i = 0; i < 10; i++) {
                // creates a table row
                var row = document.createElement("tr");

                for (var j = 0; j < 10; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(scoreresult.total_score);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

                // add the row to the end of the table body
                tblBody.appendChild(row);
            }
            // var teste = document.getElementById("user_total_score");
            // teste.innerHTML = scoreresult.total_score;
            // console.log(scoreresult.total_score);
        })

        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tbl);
        // sets the border attribute of tbl to 2;
        tbl.setAttribute("border", "2");
        console.log("Query succesfully executed", result);
    });

    // Vars
    // var teste = document.getElementById("user_total_score");
    // teste.innerHTML = isCon;
}

function displayUsername() {
    var element = document.getElementById("welcome");
    if (isCon == 'true') {
        element.classList.remove("invisible");
    } else {
        element.classList.add("col-4");
    }
}
