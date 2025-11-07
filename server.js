const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const Coin = require('./models/Coin');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create (POST) - Add a new coin
app.post('/coins', async (req, res) => {
    try {
        // console.log(req.body);
        const { name, symbol, price, marketCap, circulatingSupply } = req.body;
        const newCoin = new Coin({ name, symbol, price, marketCap, circulatingSupply });
        // console.log("newCoin => " + newCoin)
        const savedCoin = await newCoin.save();

        res.status(201).json({
            status: 'success',
            message: 'BitCoin details added successfully',
            data: savedCoin
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }

});

// Read (GET) - List all coins
app.get('/coins', async (req, res) => {
    const coins = await Coin.find();
    res.json(coins);
});

// Read (GET) - Get a single coin by symbol
app.get('/coins/:symbol', async (req, res) => {

});

app.put('/coins/:symbol', async (req, res) => {

});

app.delete('/coins/:symbol', async (req, res) => {

});
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));