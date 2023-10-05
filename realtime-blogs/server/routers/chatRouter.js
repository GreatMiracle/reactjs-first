

const express = require('express');
const { createNewChatController, getAllChatsController } = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
require('dotenv').config();

router.post('/create-new-chat', authMiddleware, createNewChatController);

router.get('/get-all-chats', authMiddleware, getAllChatsController);

module.exports = router;