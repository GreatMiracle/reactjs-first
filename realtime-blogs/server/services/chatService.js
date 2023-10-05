const Chat = require("../models/chatModel");


const createNewChatService = async (req, res) => {
    console.log("--------------------------------------CREATE NEW CHAT--------------------------------------------------");
    try {
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
        console.log("req.body>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body);
        const allChats = await Chat.find({ members: { $in: [req.body.userId] } })
            .populate("members")
            .sort({ updateAt: -1 });

        console.log(allChats);

        return res.send({
            message: "Chat created successfully!",
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

module.exports = {
    createNewChatService
    , getAllChatsService
}