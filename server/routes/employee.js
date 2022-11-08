const express = require("express");
const router = express.Router();
const Employee = require("../models/employee")

// Get all employee data
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.send(err.message);
    }
});

// Add employee data
router.post('/', async (req, res) => {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        salary: req.body.salary
    });
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update employee data
router.patch('/:id', async (req, res) => {

});

// Delete employee data
router.delete('/:id', async (req, res) => {

});

module.exports = router;