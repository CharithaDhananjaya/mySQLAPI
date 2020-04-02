const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const customers = require('./controllers/customer.controller');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Smaple Route
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Success...!"
    });
});

//Creating a Customer
app.post("/customers", customers.create);

//Find a Customer by Customer ID
app.get("/customers/:customerId", customers.findOne);

//Retrive All Customer Data
app.get("/customers", customers.findAll);

//Update Customer by Custoemr ID
app.put("/customers/:customerId", customers.update)

module.exports = app;
