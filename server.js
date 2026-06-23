const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Supplement = require('./models/Supplement');

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/gymdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Home API
app.get("/", (req, res) => {
    res.send("Gym Supplement Backend Running");
});

// Get Products from MongoDB
app.get("/products", async (req, res) => {
    try {
        const products = await Supplement.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Add Product API
app.post("/add-product", async (req, res) => {
    try {
        const supplement = new Supplement(req.body);
        await supplement.save();

        res.json({
            message: "Product Added Successfully",
            supplement
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Order API
app.post("/order", (req, res) => {
    const { product, quantity } = req.body;

    if (!product || !quantity) {
        return res.status(400).json({
            message: "Product and quantity are required"
        });
    }

    res.json({
        message: "Order placed successfully",
        order: { product, quantity }
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});