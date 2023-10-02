const express = require('express');
const User = require('../models/userModel');


const registerUserService = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({
                message: "User already in Database",
                success: false
            })
        }

        console.log("aaaaaaaaaaaaaaaaaaa");
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


module.exports = {
    registerUserService
}