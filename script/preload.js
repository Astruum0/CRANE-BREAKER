////////////////////////// SETUP ///////////////////////////

// Import all libraries
const mysql = require('mysql');
const Store = require('electron-store');
const store = new Store();
const ipcRenderer = require('electron').ipcRenderer;
const bcrypt = require('bcrypt');

// Const declarations
const isCon = store.get('connected');
const getUsername = store.get('username');
const getEmail = store.get('email');
const getTotalScore = store.get('total_score');
const getBest5 = store.get('best5');
const saltRounds = 10;

// Admin hash generator
// argpass = "";
// const salt = bcrypt.genSaltSync(saltRounds);
// const hashedpass = bcrypt.hashSync(argpass, salt);
// console.log(hashedpass);

// SQL querys
const userquery = 'SELECT * FROM `user` LIMIT 10';
const scorequery = "SELECT u.username AS 'username', SUM(sc.score) AS 'total', sc.score_date AS 'date' FROM scores AS sc LEFT JOIN user AS u ON u.id = sc.user_id GROUP BY username, date";

const getUserScores = "SELECT u.username AS 'username', SUM(sc.total_score) AS 'total', sc.score_date AS 'date' FROM scores AS sc LEFT JOIN user AS u ON u.id = sc.user_id WHERE username = '" + getUsername + "'";


// BDD connection options
const con = mysql.createConnection({
    host: "86.234.96.174", // PC at Malgache's home
    user: "user",
    password: "user",
    database: "cranebreaker"
});

// BDD connection
con.connect(function (err) {
    if (err) throw err;
});

////////////////////////////////////////////////////////////////

////////////////////////// FUNCTIONS ///////////////////////////

// Check if session exists
function checkSession() {
    if (isCon == 'true') {
        document.getElementById("username").innerText = getUsername;
        document.getElementById("email").innerText = getEmail;
        document.getElementById("total_score").innerText = getTotalScore;

        // Get scores
        con.query(getUserScores, function (err, result) {
            if (err) throw err;

            store.set('total_score', result.total)
            if (result.total == 'undefined') {
                store.set('total_score', 0);
            }
        });

    } else {
        window.location.replace("login.html");
    }
}

// Function to get all admin infos
function getAllAdmin() {
    con.query(userquery, function (err, result) {
        if (err) throw err;

        const divcontainer = document.getElementById("centercontainer");

        const tbl = document.createElement("table");
        tbl.classList.add("table");
        tbl.classList.add("table-dark");
        tbl.classList.add("col-lg-auto");
        const tblhead = document.createElement("thead");
        divcontainer.appendChild(tbl);

        // Header tableau
        const trhead = document.createElement("tr");

        const th1 = document.createElement("th");
        const thjoueur = document.createTextNode("Joueur");
        th1.appendChild(thjoueur);

        const th2 = document.createElement("th");
        const thmail = document.createTextNode("Adresse e-mail");
        th2.appendChild(thmail);

        const th3 = document.createElement("th");
        const theditbtn = document.createTextNode("");
        th3.appendChild(theditbtn);

        tblhead.appendChild(th1);
        tblhead.appendChild(th2);
        tblhead.appendChild(th3);
        //

        const tblBody = document.createElement("tbody");

        tbl.appendChild(tblBody);
        tbl.appendChild(tblhead);

        // Declare ID
        let idinc;

        Object.keys(result).forEach(function (key) {
            const playerresult = result[key];
            // ID increment
            idinc++;

            const trrow = document.createElement("tr");

            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const text1 = document.createTextNode(playerresult.username);
            const text2 = document.createTextNode(playerresult.email);
            const text3 = document.createElement("a");
            text3.classList.add("btn");
            text3.classList.add("btn-primary");
            text3.href = "adminEdit.html"
            text3.innerText = "Modifier";
            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            trrow.appendChild(td1);
            trrow.appendChild(td2);
            trrow.appendChild(td3);
            tblBody.appendChild(trrow);
        });

        // Bouton retour
        const backbutton = document.createElement("a");
        backbutton.innerText = "Retour";
        backbutton.href = "index.html";
        backbutton.classList.add("btn");
        backbutton.classList.add("btn-light");
        backbutton.classList.add("col-2");
        divcontainer.appendChild(backbutton);
    });
}

// Function to get scores and display them in scores.html
function getScores() {

    // Get high scores
    con.query(scorequery, function (err, result) {
        if (err) throw err;
        const divcontainer = document.getElementById("centercontainer");

        const tbl = document.createElement("table");
        tbl.classList.add("table");
        tbl.classList.add("table-dark");
        tbl.classList.add("col-lg-auto");
        const tblhead = document.createElement("thead");
        divcontainer.appendChild(tbl);

        // Header table
        const trhead = document.createElement("tr");

        const th1 = document.createElement("th");
        const thjoueur = document.createTextNode("Joueur");
        th1.appendChild(thjoueur);

        const th2 = document.createElement("th");
        const thlvl = document.createTextNode("Score total");
        th2.appendChild(thlvl);

        const th3 = document.createElement("th");
        const th5best = document.createTextNode("5 meilleures parties");
        th3.appendChild(th5best);

        tblhead.appendChild(th1);
        tblhead.appendChild(th2);
        tblhead.appendChild(th3);
        //

        const tblBody = document.createElement("tbody");

        tbl.appendChild(tblBody);
        tbl.appendChild(tblhead);

        console.log(result);

        Object.keys(result).forEach(function (key) {
            const scoreresult = result[key];
            const trrow = document.createElement("tr");

            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const text1 = document.createTextNode(scoreresult.username);
            const text2 = document.createTextNode(scoreresult.total);
            const text3 = document.createTextNode(scoreresult.date);
            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            trrow.appendChild(td1);
            trrow.appendChild(td2);
            trrow.appendChild(td3);
            tblBody.appendChild(trrow);
        });

        // "Retour" button
        const backbutton = document.createElement("a");
        backbutton.innerText = "Retour";
        backbutton.href = "index.html";
        backbutton.classList.add("btn");
        backbutton.classList.add("btn-light");
        backbutton.classList.add("col-2");
        divcontainer.appendChild(backbutton);
    });
}

// Function to check all session variables and make buttons redirect to correct views
function redirectSession() {
    const element = document.getElementById("welcome");
    const getUserDiv = document.getElementById("user");
    const btnProfile = document.getElementById("buttonProfile");
    const btnAdmin = document.getElementById("adminAccess");
    if (isCon == 'true') {
        const userinfoUsername = store.get('username')
        element.classList.remove("invisible");
        getUserDiv.innerText = userinfoUsername;
        btnProfile.href = "profile.html"
    } else {
        btnProfile.href = "login.html"
    }

    // Check admin session
    if (store.get('adminSession') == 'true') {
        btnAdmin.href = "adminPanel.html"
    } else {
        btnAdmin.href = "adminLogin.html"
    }
}

// Exit game function with ipcMessage
function closeApp() {
    ipcRenderer.send('close-me')
}

// Login function
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

// Admin login function
function adminLoginForm(event) {
    event.preventDefault() // stop the form from submitting

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let adminloginquery = "SELECT email, password FROM admin WHERE email = '" + email + "'";

    con.query(adminloginquery, function (err, result) {
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
                store.set('adminSession', 'true');
                window.location.replace("adminPanel.html");
            } else {
                alert("Nom d'utilisateur ou mot de passe incorrect")
            }
        }
    });
}

// Register function
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
    const registerquery = "INSERT INTO user (username, email, password) VALUES ('" + username + "', '" + email + "', '" + hashedpass + "')"
    const alsoscorequery = "INSERT INTO scores (user_id, total_score) VALUES ((SELECT id FROM user WHERE username = '" + username + "'), 0)";
    const checkquery = "SELECT username, email FROM user WHERE username = '" + username + "' OR email = '" + email + "'";

    if (password != passwordConfirm) {
        alert("Les deux mots de passes ne correspondent pas");
        return Error1
    }

    else if (password.length < 8) {
        alert("Le mot de passe doit faire au moins 8 caractères")
        return Error2
    } else {

        // Check if user already exists in database
        con.query(checkquery, function (err, result) {
            if (err) throw err;

            if (result.length) {
                alert("Erreur : Un utilisateur avec ce pseudo ou cette adresse mail existe déjà");
            } else {

                // Register in BDD
                con.query(registerquery, function (err, result) {
                    if (err) throw err;

                    alert("Utilisateur enregistré !")
                    window.location.replace("index.html");

                    con.query(alsoscorequery, function (err, result) {
                        if (err) throw err;
                    });
                });
            }
        });
    }
}

// Edit account infos function
function editForm(event) {
    event.preventDefault() // stop the form from submitting

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let oldpassword = document.getElementById("oldpassword").value;
    let newpassword = document.getElementById("newpassword").value;

    // Hash password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashednewpass = bcrypt.hashSync(newpassword, salt);

    const hashOldCompare = bcrypt.compareSync(oldpassword, store.get('password'));

    if (hashOldCompare != true) {
        alert("L'ancien mot de passe ne correspond pas");
        return Error1
    } else if (newpassword.length < 8) {
        alert("Le mot de passe doit faire au moins 8 caractères")
        return Error2
    } else {
        // Check if username is the same and skip check if it's the same
        if (username == store.get('username') && email == store.get('email')) {
            updateInfos();
        } else {
            const checkuserquery = "SELECT username, email FROM user WHERE username = '" + username + "' OR email = '" + email + "'";

            con.query(checkuserquery, function (err, result) {
                if (err) throw err;

                if (result.length) {
                    alert("Erreur : Un utilisateur avec ce pseudo ou cette adresse mail existe déjà");
                    return Error3
                } else {

                    // Register in BDD
                    function updateInfos() {
                        const updatequery1 = "UPDATE user SET username = '" + username + "', email = '" + email + "', password = '" + hashednewpass + "' WHERE username = '" + store.get('username') + "'";
                        const updatequery2 = "UPDATE scores SET username = '" + username + "' WHERE username = '" + store.get('username') + "'";

                        // Edit local session variables
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

// Logout function
function logout() {
    store.set('connected', 'false');
    store.delete('username');
    store.delete('password');
    store.delete('email');
    store.delete('total_score');
    store.delete('best5');
    window.location.replace("index.html");
}

// Future function for score update; needs 3 values : final game score, best of 5 score, user_id or username
// function scoreUpdate {
//     const updatescorequery = "UPDATE scores SET total_score = '" + valueTotalScore + "', best5_score = '" + valueBest5 + "'";
//     // Get Score Value

// }