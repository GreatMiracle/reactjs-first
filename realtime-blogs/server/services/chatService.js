const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");


const createNewChatService = async (req, res) => {
    console.log("--------------------------------------CREATE NEW CHAT--------------------------------------------------");
    try {
        console.log("Chat(req.body)", req.body);
        console.log("req.body.members", req.body.members);

        const isExistChat = await Chat.findOne({
            members: {
                $all: req.body.members
            }
        });

        // console.log("isExistChatisExistChat", isExistChat);
        if (isExistChat === null) {
            const createChat = new Chat(req.body);
            // console.log("createChat-createChat", createChat);
            const saveChat = await createChat.save();
            // console.log("saveChat", saveChat);

            return res.send({
                message: "Chat created successfully!",
                success: true,
                data: saveChat
            })
        }

        // console.log("isExistChat._id.toString()", isExistChat);
        return res.send({
            message: "Chat created successfully!",
            success: true,
            data: isExistChat
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
        // console.log("req.bodyreq.bodyreq.body", req.body);
        const chatNeedToUpdate = await Chat.findById(req.body.chat);
        if (!chatNeedToUpdate) {
            return res.send({
                message: "Chat not found",
                success: fasle,
                err: error.message
            })
        }

        // const updateChat = await Chat.findByIdAndUpdate(
        //     req.body.chat,
        //     { unreadMessages: 0, },
        //     { new: true }
        // )
        //     .populate("members")
        //     .populate("lastMessage");


        // const chatNeedToUpdate = await Chat.findOne({ _id: req.body.chat });
        const ownerMsg = chatNeedToUpdate.members;
        // console.log("chatUpchatUp1", chatNeedToUpdate);
        // console.log("ownerMsg1", ownerMsg);
        // console.log("ownerMsg00000001", ownerMsg[0]);
        let updateChat;
        if (ownerMsg[0].toString() === req.body.userId) {
            updateChat = await Chat.findByIdAndUpdate(
                req.body.chat,
                { unreadMessagesSender: 0, },
                { new: true }
            )
                .populate("members")
                .populate("lastMessage");
        }

        if (ownerMsg[1].toString() === req.body.userId) {
            updateChat = await Chat.findByIdAndUpdate(
                req.body.chat,
                { unreadMessagesRecipient: 0, },
                { new: true }
            )
                .populate("members")
                .populate("lastMessage");
        }

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