const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');


const createNewMessageService = async (req, res) => {
    console.log("--------------------------------------CREATE MESSAGE--------------------------------------------------");
    try {
        const { chat, sender, text } = req.body.message;
        const newMessage = new Message({ chat, sender, text });
        const saveMessage = await newMessage.save();

        // const chatUp = await Chat.findOneAndUpdate(
        //     { _id: chat },
        //     {
        //         lastMessage: saveMessage._id,
        //         $inc: { unreadMessages: 1 },
        //     }
        // )
        const chatNeedToUpdate = await Chat.findOne({ _id: chat });
        const ownerMsg = chatNeedToUpdate.members;
        // console.log("chatUpchatUp", chatNeedToUpdate);
        // console.log("ownerMsg", ownerMsg);
        // console.log("ownerMsg0000000", ownerMsg[0]);
        // console.log("sender", sender);
        let chatUp;
        if (ownerMsg[0].toString() === sender) {
            // console.log("đây là thằng bắt đầu cuộc trò chuyện", sender);

            chatUp = await Chat.findOneAndUpdate(
                { _id: chat },
                {
                    lastMessage: saveMessage._id,
                    $inc: { unreadMessagesRecipient: 1 },
                }
            )
        }

        if (ownerMsg[1].toString() === sender) {
            // console.log("đây là nguwoif nhận", sender);
            chatUp = await Chat.findOneAndUpdate(
                { _id: chat },
                {
                    lastMessage: saveMessage._id,
                    $inc: { unreadMessagesSender: 1 },
                }
            )
        }
        await chatUp.save();

        return res.send({
            message: "Message sent successfully!",
            success: true,
            data: saveMessage
        })

    } catch (error) {
        return res.send({
            message: "Error sent message",
            success: true,
            err: error.message
        })
    }
};

const getAllMessageService = async (req, res) => {
    console.log("--------------------------------------GET ALL MESSAGE--------------------------------------------------");
    try {
        const chatId = req.params.chatId;
        const listMessageOfChat = await Message.find({ chat: chatId })
            .sort({ createAt: 1 });

        return res.send({
            message: "Message sent successfully!",
            success: true,
            data: listMessageOfChat
        })

    } catch (error) {
        return res.send({
            message: "Error sent message",
            success: false,
            err: error.message
        })
    }
};

module.exports = {
    createNewMessageService
    , getAllMessageService
}