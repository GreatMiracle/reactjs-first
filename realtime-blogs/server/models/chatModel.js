const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        members: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                }
            ]
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages",
        },
        unreadMessages: { //sender corresponding with member[0] - human start conversation
            type: Number,
            default: 0,
        },
        unreadMessagesSender: { //sender corresponding with member[0] - human start conversation
            type: Number,
            default: 0,
        },
        unreadMessagesRecipient: {  //recipient corresponding with member[1]
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
)
const Chat = mongoose.model('chats', chatSchema);

module.exports = Chat;