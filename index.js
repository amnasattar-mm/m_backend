require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Users = require('./models/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// MongoDB Connection
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully!!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

main();


// Health Check for Railway
app.get('/health', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running"
    });
});


// CREATE USER
app.post('/users', async (req, res) => {

    const { name, email, contact, password, address } = req.body;

    const newData = new Users({
        name,
        email,
        contact,
        password,
        address
    });

    await newData.save();

    res.status(201).json({
        message: "User created successfully"
    });
});


// GET USERS
app.get('/users', async (req, res) => {

    const users = await Users.find();

    res.status(200).json(users);
});


// DELETE USER
app.delete('/users/:id', async (req, res) => {

    await Users.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "User has been deleted successfully"
    });
});


// UPDATE USER
app.put('/users/:id', async (req, res) => {

    const id = req.params.id;

    const {
        name,
        email,
        contact,
        password,
        address
    } = req.body;

    const updateData = {
        name,
        email,
        contact,
        password,
        address
    };

    await Users.findByIdAndUpdate(id, updateData);

    res.status(200).json({
        message: "User updated successfully"
    });
});


// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});