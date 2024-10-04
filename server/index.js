const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Admins", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } 
                else {
                    res.status(401).json("The password is incorrect");
                }
            } 
            else {
                res.status(404).json("No record existed");
            }
        })
        .catch(err => res.status(500).json("Error occurred: " + err));
});

// Register route
app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.status(201).json(employee))
        .catch(err => res.status(400).json(err));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
