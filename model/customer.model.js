const sql = require('../db');

const Customer = function (customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.status = customer.status;
};

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET?", newCustomer, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("Creted Customer:", { id: res.insertID, ...newCustomer });
        result(null, { id: res.insertID, ...newCustomer });
    });
};

module.exports = Customers;