require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.BACKEND_PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Mongo database
mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.6vl5ci0.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    function (err) {
        if (err) { console.log(err); } else {
            console.log('Connected to database!')
        }
    });

const db = mongoose.connection;

// Create employee data endpoint
const employeeRouter = require("./routes/employee");
app.use("/employee", employeeRouter);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});