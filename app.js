const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const dbConfig = require('./config/db.config');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Smaple Route
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Success...!"
    });
});

//mySQL Database Connection configuration
const dbConnection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE
});

//mySQL database Creation
dbConnection.connect((err, result) => {
    if (err) {
        console.log(err);
    }
    else {
        dbConnection.query("CREATE DATABASE IF NOT EXISTS mydb", (err, result) => {
            if (err) throw err;
            console.log("DB Created...!");
        })
        if (dbConnection.state === 'disconnected') {
            console.log("DB Not Connected...!");
        }
        else {
            console.log("DB Connected...!");
        }
    }
});

const table_1 = "CREATE TABLE IF NOT EXISTS customers (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,email VARCHAR(255), name VARCHAR(255), address VARCHAR(255), status BOOLEAN DEFAULT false)"

dbConnection.query(table_1, (err, result) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(result);
    }
})

module.exports = app;
