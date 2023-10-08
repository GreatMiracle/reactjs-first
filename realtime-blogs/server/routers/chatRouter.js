

const express = require('express');
const { createNewChatController, getAllChatsController, getDetailChatController, unreadMessageChatController } = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
require('dotenv').config();

router.post('/create-new-chat', authMiddleware, createNewChatController);

router.get('/get-all-chats', authMiddleware, getAllChatsController);

router.get('/get-detail-chat/:id', authMiddleware, getDetailChatController)

router.post('/clear-unread-message', authMiddleware, unreadMessageChatController)


module.exports = router;