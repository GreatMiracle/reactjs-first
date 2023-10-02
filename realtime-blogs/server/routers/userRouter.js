
const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { registerController } = require('../controllers/userControler');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// user Registration

router.post('/register', registerController)

router.post('/login', async (req, res) => {
    console.log("kiennnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
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
            res.send({
                message: "Invalid password!",
                success: false
            })
        }

        const token = jwt.sign({ userId: user_id }, process.env.JWT_SECRET);
        res.send({
            message: "User login successfully!",
            success: true,
            data: token
        })

    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router;