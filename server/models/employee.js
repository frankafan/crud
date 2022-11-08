const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("Employee", employeeSchema);