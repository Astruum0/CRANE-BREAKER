const mysql = require('mysql');

var con = mysql.createConnection({
    host: "86.234.96.174",
    user: "user",
    password: "user",
    database: "cranebreaker"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

$query = 'SELECT * FROM `user` LIMIT 10';

con.query($query, function (err, rows, fields) {
    if (err) throw err;

    console.log("Query succesfully executed", rows);
});