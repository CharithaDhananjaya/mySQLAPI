const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const customers = require('./model/customer.model');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Smaple Route
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Success...!"
    });
});

app.post("/customers", customers.create);

module.exports = app;
