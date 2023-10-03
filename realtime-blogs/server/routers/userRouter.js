
const express = require('express');
const { getCurrentUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
require('dotenv').config();

router.get('/current-user', authMiddleware, getCurrentUserController)

module.exports = router;