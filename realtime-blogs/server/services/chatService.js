const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");


const createNewChatService = async (req, res) => {
    console.log("--------------------------------------CREATE NEW CHAT--------------------------------------------------");
    try {
        console.log("Chat(req.body)", req.body);
        const createChat = new Chat(req.body);
        const saveChat = await createChat.save();

        return res.send({
            message: "Chat created successfully!",
            success: true,
            data: saveChat
        })

    } catch (error) {
        return res.send({
            message: "Error creating chat",
            success: false,
            error: error.message
        })
    }
}

const getAllChatsService = async (req, res) => {
    console.log("--------------------------------------CREATE NEW CHAT--------------------------------------------------");
    try {
        // console.log("req.body>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body);
        const allChats = await Chat.find({ members: { $in: [req.body.userId] } })
            .populate("members")
            .populate("lastMessage")
            .sort({ updateAt: -1 });
        // console.log("allChats", allChats);
        return res.send({
            message: "Get all Chats successfully!",
            success: true,
            data: allChats
        })

    } catch (error) {
        return res.send({
            message: "Error creating chat",
            success: false,
            error: error.message
        })
    }
}


const getDetailChatService = async (req, res) => {
    console.log("--------------------------------------DETAIL CHAT--------------------------------------------------");
    try {

        console.log("req.params.id", req.params.id);
        const detailChat = await Chat.findById(req.params.id)
            .populate("members");

        return res.send({
            message: "Get detail Chat successfully!",
            success: true,
            data: detailChat
        })

    } catch (error) {
        return res.send({
            message: "Error creating chat",
            success: false,
            error: error.message
        })
    }
}


const unreadMessageChatService = async (req, res) => {
    console.log("--------------------------------------UNREAD MESSAGE--------------------------------------------------");
    try {
        const chat = await Chat.findById(req.body.chat);
        if (!chat) {
            return res.send({
                message: "Chat not found",
                success: fasle,
                err: error.message
            })
        }

        const updateChat = await Chat.findByIdAndUpdate(
            req.body.chat,
            { unreadMessages: 0, },
            { new: true }
        )
            .populate("members")
            .populate("lastMessage");

        await Message.updateMany(
            {
                chat: req.body.chat,
                read: false
            },
            { read: true }
        );

        return res.send({
            message: "Unread message clear successfully!",
            success: true,
            data: updateChat
        });
    }
    catch (error) {
        return res.send({
            message: "Error clear unread message",
            success: false,
            err: error.message
        })
    }

};

module.exports = {
    createNewChatService
    , getAllChatsService
    , getDetailChatService
    , unreadMessageChatService
}