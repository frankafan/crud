const express = require("express");
const router = express.Router();
const Employee = require("../models/employee")

// Get all employee data
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.json({ message: err.message });
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
        res.status(400).json({ message: err.message });
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
        res.status(400).json({ message: err.message });
    }
});

// Delete employee data
router.delete('/:id', getEmployee, async (req, res) => {
    try {
        await res.employee.remove();
        res.json({ message: "Employee deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete all employee data
router.delete('/', async (req, res) => {
    try {
        await Employee.remove({});
        res.json({ message: "All employees deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add example employee data
router.post('/addExamples', async (req, res) => {
    try {
        await Employee.insertMany([
            {
                "firstName": "Lewis",
                "lastName": "Burson",
                "salary": 40700
            },
            {
                "firstName": "Ian",
                "lastName": "Malcolm",
                "salary": 70000
            },
            {
                "firstName": "Ellie",
                "lastName": "Sattler",
                "salary": 102000
            },
            {
                "firstName": "Dennis",
                "lastName": "Nedry",
                "salary": 52000
            },
            {
                "firstName": "John",
                "lastName": "Hammond",
                "salary": 89600
            },
            {
                "firstName": "Ray",
                "lastName": "Arnold",
                "salary": 45000
            },
            {
                "firstName": "Laura",
                "lastName": "Burnett",
                "salary": 80000
            }
        ])
        res.status(201).json({ message: "Example data added"});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: "Employee does not exist" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.employee = employee;
    next()
}

module.exports = router;