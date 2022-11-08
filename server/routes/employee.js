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
router.patch('/:id', getEmployee, async (req, res) => {
    if (req.body.firstName != null) {
        res.employee.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
        res.employee.lastName = req.body.lastName;
    }
    if (req.body.salary != null) {
        res.employee.salary = req.body.salary;
    }
    try {
        const updatedEmployee = await res.employee.save();
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete employee data
router.delete('/:id', getEmployee, async (req, res) => {
    try {
        await res.employee.remove();
        res.send("Employee deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
});


async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id);
        if (employee == null) {
            return res.status(404).send("Employee does not exist");
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
    res.employee = employee;
    next()
}

module.exports = router;