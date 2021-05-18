// var mysql = require('mysql');
// var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var path = require('path');

// var exp = express();

// exp.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));
// exp.use(bodyParser.urlencoded({ extended: true }));
// exp.use(bodyParser.json());

// exp.post('/login', function (request, response) {
//     console.log("wsohoh");
//     var username = request.body.username;
//     var password = request.body.password;
//     if (username && password) {
//         connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
//             if (results.length > 0) {
//                 console.log("fezfz");
//                 request.session.loggedin = true;
//                 request.session.username = username;
//                 response.redirect('/index.html');
//             } else {
//                 response.send('Incorrect Username and/or Password!');
//                 console.log("non");
//             }
//             response.end();
//         });
//     } else {
//         response.send('Please enter Username and Password!');
//         response.end();
//     }
// });
// exp.listen(3000);