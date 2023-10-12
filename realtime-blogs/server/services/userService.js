const User = require('../models/userModel');
const cloudinary = require("../config/cloudinary")

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


const updateProfilePictureService = async (req, res) => {
    console.log("--------------------------------------UPDATE PROFILE PICTURE OF USER--------------------------------------------------");
    try {
        const image = req.body.image;

        const uploadImage = await cloudinary.uploader
            .upload(image
                , { folder: "chat-app" }
                , (error, result) => {
                    console.log(result, error);
                });

        const userUp = await User.findOneAndUpdate({ _id: req.body.userId }
            , { profilePic: uploadImage.secure_url }
            , { new: true })

        return res.send({
            message: "Profile picture updated successfully!",
            success: true,
            data: userUp
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
    , updateProfilePictureService
}