

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createNewMessageController, getAllMessageController } = require('../controllers/messageController');
const router = express.Router();
require('dotenv').config();

router.post('/create-message', authMiddleware, createNewMessageController)

router.get('/get-all-message/:chatId', authMiddleware, getAllMessageController)

module.exports = router;