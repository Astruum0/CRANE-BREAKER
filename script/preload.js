// Basic imports
const mysql = require('mysql');
const Store = require('electron-store');
const store = new Store();
const ipcRenderer = require('electron').ipcRenderer;
var bcrypt = require('bcrypt');
const saltRounds = 10;

// Vars
const isCon = store.get('connected');
var maxplayerresult;

// Querys
const userquery = 'SELECT * FROM `user` LIMIT 10';
const scorequery = 'SELECT * FROM `scores` LIMIT 10';
const maxplayersquery = "SELECT COUNT(user_id) AS 'countresult' FROM `scores`"

// BDD Connect options
con = mysql.createConnection({
    host: "86.234.96.174",
    user: "user",
    password: "user",
    database: "cranebreaker"
});

// Connexion à la BDD
con.connect(function (err) {
    if (err) throw err;
});

// Function to get scores and display them in scores.html
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
        var divcontainer = document.getElementById("centercontainer");

        var tbl = document.createElement("table");
        tbl.classList.add("table");
        tbl.classList.add("table-dark");
        tbl.classList.add("col-lg-auto");
        var tblhead = document.createElement("thead");
        divcontainer.appendChild(tbl);

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

        // Bouton retour
        var backbutton = document.createElement("a");
        backbutton.innerText = "Retour";
        backbutton.href = "index.html";
        backbutton.classList.add("btn");
        backbutton.classList.add("btn-info");
        backbutton.classList.add("col-4");
        divcontainer.appendChild(backbutton);
    });
}

// Fonction future pour afficher le nom d'utilisateur connecté
function displayUsername() {
    var element = document.getElementById("welcome");
    if (isCon == 'true') {
        element.classList.remove("invisible");
    } else {
        element.classList.add("col-4");
    }
}

// Fonction pour quitter le jeu
function closeApp() {
    ipcRenderer.send('close-me')
}

// Fonction de Login
function loginForm(event) {
    event.preventDefault() // stop the form from submitting

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Hash password
    const hashedpass = bcrypt.hashSync(password, saltRounds);
    console.log(hashedpass);

    let loginquery = "SELECT username, password FROM user WHERE username = '" + username + "' AND password = '" + hashedpass + "'";

    con.query(loginquery, function (err, result) {
        if (err) throw err;

        if (result.length) {
            alert("Vous êtes connecté !")
            store.set('connected', 'true');
        } else {
            alert("Nom d'utilisateur ou mot de passe incorrect")
        }
    });
}

// Fonction de register
function registerForm(event) {
    event.preventDefault() // stop the form from submitting

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let registerquery = "INSERT INTO user (username, email, password) VALUES ('" + username + "', '" + email + "', '" + password + "')"
    let checkquery = "SELECT username, email FROM user WHERE username = '" + username + "' OR email = '" + email + "'";

    // Hash password
    const hashedpass = bcrypt.hashSync(password, saltRounds);
    console.log(hashedpass);

    con.query(checkquery, function (err, result) {
        if (err) throw err;

        if (result.length) {
            alert("Erreur : Un utilisateur avec ce pseudo ou cette adresse mail existe déjà");
        } else {

            con.query(registerquery, function (err, result) {
                if (err) throw err;

                alert("Utilisateur enregistré !")
            });
        }
    });
}