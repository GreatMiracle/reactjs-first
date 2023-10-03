const express = require('express');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');


const registerUserService = async (req, res) => {
    console.log("--------------------------------------REGISTER--------------------------------------------------");
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({
                message: "User already in Database",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const createUser = new User(req.body);
        await createUser.save();
        return res.send({
            message: "Create User successfully!",
            success: true
        })

    } catch (error) {
        return res.send({
            message: error.message,
            success: false
        })
    }
};

const loginUserService = async (req, res) => {
    console.log("--------------------------------------LOGIN--------------------------------------------------");
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                message: "User does not exist",
                success: false
            })
        }

        const validPwd = await bcryptjs.compare(req.body.password, user.password);

        if (!validPwd) {
            return res.send({
                message: "Invalid password!",
                success: false
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.send({
            message: "User login successfully!",
            success: true,
            token: token
        })

    } catch (error) {
        return res.send({
            message: error.message,
            success: false
        })
    }
};


module.exports = {
    registerUserService
    , loginUserService
}