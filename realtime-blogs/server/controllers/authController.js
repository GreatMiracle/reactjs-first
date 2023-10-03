const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { registerUserService, loginUserService } = require('../services/authService');

const registerController = async (req, res) => {
    const results = await registerUserService(req, res);
}

const loginController = async (req, res) => {
    const results = await loginUserService(req, res);
}

module.exports = {
    registerController
    , loginController
}