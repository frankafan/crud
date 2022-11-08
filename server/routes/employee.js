const express = require("express");
const router = express.Router();
const Employee = require("../models/employee")

// Get all employee data
router.get('/', async (req, res) => {

});

// Add employee data
router.post('/', async (req, res) => {

});

// Update employee data
router.patch('/:id', async (req, res) => {

});

// Delete employee data
router.delete('/:id', async (req, res) => {

});

module.exports = router;