const Customer = require('../models/customer.model');

exports.create = (req, res, next) => {
    // Validate request
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        status: req.body.status
    });

    // Save Customer in the database
    Customer.create(customer, (err, data) => {
        if (err)
            res.status(500).json({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else res.status(201).json({
            Created: data
        });
    });
};

exports.findOne = (req, res, next) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not Found Customer ID with ${req.params.customerId}.`
                });
            } else {
                res.status(500).json({
                    message: `Error Retriving Customer ID with ${req.params.customerId}.`
                });
            }
        } else
            res.status(200).json({
                customer_data: data
            });
    });
};

exports.findAll = (req, res, next) => {
    Customer.getAll((err, data) => {
        if (err) {
            res.status(500).json({
                message: "Error Retriving Customers.",
                error: err.message
            });
        } else
            res.status(200).json({
                all_customer_data: data
            });
    });
};