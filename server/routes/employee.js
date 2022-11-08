const express = require("express");
const router = express.Router();

// Get all employee data
router.get('/', (req, res) => {
    res.send("hello")
});

// Add employee data
router.post('/', (req, res) => {

});

// Update employee data
router.patch('/:id', (req, res) => {

});

// Delete employee data
router.delete('/:id', (req, res) => {

});

module.exports = router;