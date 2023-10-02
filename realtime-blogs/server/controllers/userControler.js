const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { registerUserService } = require('../services/userService');

const registerController = async (req, res) => {
    const results = await registerUserService(req, res);
}

module.exports = {
    registerController
}