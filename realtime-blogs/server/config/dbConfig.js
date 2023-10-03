require('dotenv').config();

const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

const db = mongoose.connection;
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })


db.on('connected', () => {
    console.log('MongoDB connection successful');
});

db.on('error', (err) => {
    console.error('MongoDB connection failed');
    console.error(err);
});

module.exports = db;