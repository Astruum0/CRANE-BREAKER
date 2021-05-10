const electron = require("electron");
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = electron;

app.post('/registering', function (request, response) {
    const username = request.body.username;
    const password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM cranebreaker WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('../views/index.html');
            } else {
                response.send("Nom d'utilisateur ou mot de passe incorrect !");
            }
            response.end();
        });
    } else {
        response.send("Veuillez entrer un nom d'utilisateur ou mot de passe valide !");
        response.end();
    }
});