const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: String,
    symbol: String,
    price: Number,
    marketCap: Number,
    circulatingSupply: Number
});

module.exports = mongoose.model('Coin', coinSchema);
