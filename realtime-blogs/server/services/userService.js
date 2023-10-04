const User = require('../models/userModel');


const getCurrentUserService = async (req, res) => {
    console.log("--------------------------------------GET CURRENT USER--------------------------------------------------");
    try {

        const user = await User.findOne({ _id: req.body.userId }).select('-password');
        if (!user) {
            return res.send({
                message: "User does not exist",
                success: false
            })
        }
        return res.send({
            message: "User fetched successfully!",
            success: true,
            data: user
        })

    } catch (error) {
        return res.send({
            message: error.message,
            success: false
        })
    }
}


const getAllUserService = async (req, res) => {
    console.log("--------------------------------------GET ALL USER--------------------------------------------------");
    try {
        const allUsers = await User.find({ _id: { $ne: req.body.userId } }).select('-password');
        return res.send({
            message: "User fetched successfully!",
            success: true,
            data: allUsers
        })

    } catch (error) {
        return res.send({
            message: error.message,
            success: false
        })
    }
}


module.exports = {
    getCurrentUserService
    , getAllUserService
}