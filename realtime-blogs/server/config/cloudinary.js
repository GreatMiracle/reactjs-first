
// Require the Cloudinary library
const cloudinary = require('cloudinary').v2
require('dotenv').config();
const api_secret = process.env.CLOUDINARY;

cloudinary.config({
    cloud_name: 'dukjybmvj',
    api_key: '623662219791971',
    api_secret: api_secret,
});

module.exports = cloudinary;