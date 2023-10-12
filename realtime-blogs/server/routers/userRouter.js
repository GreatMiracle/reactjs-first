
const express = require('express');
const { getCurrentUserController, getAllUserController, updateProfilePictureController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
require('dotenv').config();

router.get('/current-user', authMiddleware, getCurrentUserController)

router.get('/get-all-users', authMiddleware, getAllUserController)

router.post('/update-profile-picture', authMiddleware, updateProfilePictureController)

module.exports = router;