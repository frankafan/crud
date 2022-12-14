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
        type: Number,
        required: true,
        default: 0,
        min:0
    },
    role: {
        type: String
    },
});

module.exports = mongoose.model("Employee", employeeSchema);