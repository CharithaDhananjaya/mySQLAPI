const sql = require('../db');

//Constructor 
const Customer = function (customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.address = customer.address;
    this.status = customer.status;
};

//Creating a New Customer
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET?", newCustomer, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("Creted Customer:", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
};

//Find Customer by ID
Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customers WHERE id =${customerId}`, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Customer Found:", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "Not_Found" }, null);
    });
};

//Retrive All Customers
Customer.getAll = result => {
    sql.query("SELECT * FROM customers", (err, res) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
            return;
        }
        console.log("All Customers:", res);
        result(null, res);
    });
};

//Update Customer by ID
Customer.updateById = (id, customer, result) => {
    sql.query("UPDATE customers SET email=?, name=?, address=?, status=? WHERE id=?",
        [customer.email, customer.name, customer.address, customer.status, id],
        (err, res) => {
            if (err) {
                console.log("Error:", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "Not_Found" }, null);
                return;
            }
            console.log("Updated Customer:", { id: id, ...customer });
            result(null, { id: id, ...customer });
        }
    );
};

module.exports = Customer;