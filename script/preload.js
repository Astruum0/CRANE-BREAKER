// Basic imports
const mysql = require('mysql');
const Store = require('electron-store');
const store = new Store();
const ipcRenderer = require('electron').ipcRenderer;
var bcrypt = require('bcrypt');
const saltRounds = 10;

// Vars
const isCon = store.get('connected');
// store.set('connected', 'false')
var maxplayerresult;

// Querys
const userquery = 'SELECT * FROM `user` LIMIT 10';
const scorequery = 'SELECT * FROM `scores` LIMIT 10';
const maxplayersquery = "SELECT COUNT(user_id) AS 'countresult' FROM `scores`";

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

// Check if session exists
function checkSession() {
    if (isCon == 'true') {
        loadInfos();
    } else {
        window.location.replace("login.html");
    }
}

function loadInfos() {
    const getUsername = store.get('username');
    document.getElementById("username").innerText = getUsername;
    const getEmail = store.get('email');
    document.getElementById("email").innerText = getEmail;

    // Get scores
    const getUserScores = "SELECT total_score, best5_score FROM scores WHERE username = '" + getUsername + "'";
    con.query(getUserScores, function (err, result) {
        if (err) throw err;

        const getTotalScore = store.get('total_score');
        const getBest5 = store.get('best5');
        store.set('total_score', result[0].total_score);
        store.set('best5', result[0].best5_score);
        if (getTotalScore == 'undefined') {
            store.set('total_score', "Vous n'avez aucun score total. Jouez maintenant !");
        } else if (getBest5 == 'undefined') {
            store.set('best5', "Vous n'avez aucun meilleur score de 5. Jouez maintenant !");
        }
    });

    const getTotalScore = store.get('total_score');
    document.getElementById("total_score").innerText = getTotalScore;
    const getBest5 = store.get('best5');
    document.getElementById("best_of_5").innerText = getBest5;
}

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
    var getUserDiv = document.getElementById("user");
    if (isCon == 'true') {
        const userinfoUsername = store.get('username')
        element.classList.remove("invisible");
        getUserDiv.innerText = userinfoUsername;
    } else {
        false;
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

    let loginquery = "SELECT username, password, email FROM user WHERE username = '" + username + "'";

    con.query(loginquery, function (err, result) {
        if (err) throw err;

        // If no user
        if (!result.length) {
            alert("Aucun utilisateur trouvé")
        } else {

            // Compare hash
            const hashCompare = bcrypt.compareSync(password, result[0].password); // true

            email = result[0].email;
            hashed = result[0].password;

            if (hashCompare == true) {
                alert("Vous êtes connecté !")
                store.set('connected', 'true');
                store.set('username', username)
                store.set('email', email)
                store.set('password', hashed)
                window.location.replace("index.html");
            } else {
                alert("Nom d'utilisateur ou mot de passe incorrect")
            }
        }
    });
}

// Fonction de register
function registerForm(event) {
    event.preventDefault() // stop the form from submitting

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let passwordConfirm = document.getElementById("passwordConfirm").value;

    // Hash password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedpass = bcrypt.hashSync(password, salt);

    // Querys
    let registerquery = "INSERT INTO user (username, email, password) VALUES ('" + username + "', '" + email + "', '" + hashedpass + "')"
    var checkquery = "SELECT username, email FROM user WHERE username = '" + username + "' OR email = '" + email + "'";

    // Check les deux password
    if (password != passwordConfirm) {
        alert("Les deux mots de passes ne correspondent pas");
        return Error1
    }

    // Check longueur password
    else if (password.length < 8) {
        alert("Le mot de passe doit faire au moins 8 caractères")
        return Error2
    } else {

        // Check si un utilisateur existe déjà
        con.query(checkquery, function (err, result) {
            if (err) throw err;

            if (result.length) {
                alert("Erreur : Un utilisateur avec ce pseudo ou cette adresse mail existe déjà");
            } else {

                // Register dans la BDD
                con.query(registerquery, function (err, result) {
                    if (err) throw err;

                    alert("Utilisateur enregistré !")
                    window.location.replace("index.html");
                });
            }
        });
    }
}

// Fonction d'edit
function editForm(event) {
    event.preventDefault() // stop the form from submitting

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let oldpassword = document.getElementById("oldpassword").value;
    let newpassword = document.getElementById("newpassword").value;

    // Hash password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashednewpass = bcrypt.hashSync(newpassword, salt);

    // Check les deux password
    const hashOldCompare = bcrypt.compareSync(oldpassword, store.get('password'));

    if (hashOldCompare != true) {
        alert("L'ancien mot de passe ne correspond pas");
        return Error1
    } else if (newpassword.length < 8) {
        // Check longueur password
        alert("Le mot de passe doit faire au moins 8 caractères")
        return Error2
    } else {
        // Check si le username ou email est le mếme
        if (username == store.get('username') && email == store.get('email')) {
            updateInfos();
        } else {
            const checkuserquery = "SELECT username, email FROM user WHERE username = '" + username + "' OR email = '" + email + "'";

            // Check si un utilisateur existe déjà
            con.query(checkuserquery, function (err, result) {
                if (err) throw err;

                if (result.length) {
                    alert("Erreur : Un utilisateur avec ce pseudo ou cette adresse mail existe déjà");
                    return Error3
                } else {

                    // Register dans la BDD
                    function updateInfos() {
                        const updatequery1 = "UPDATE user SET username = '" + username + "', email = '" + email + "', password = '" + hashednewpass + "' WHERE username = '" + store.get('username') + "'";
                        const updatequery2 = "UPDATE scores SET username = '" + username + "' WHERE username = '" + store.get('username') + "'";

                        // Edit local
                        store.set('username', username);
                        store.set('email', email)
                        store.set('password', hashednewpass)
                        con.query(updatequery1, function (err, result) {
                            if (err) throw err;

                            alert("Modifications effectuées !");
                            window.location.replace("index.html");

                            con.query(updatequery2, function (err, result) {
                                if (err) throw err;

                            });
                        });
                    }
                    updateInfos();
                }
            });
        }
    }
}