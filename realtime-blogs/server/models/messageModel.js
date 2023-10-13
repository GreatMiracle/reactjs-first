const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chats",
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        text: {
            type: String,

        },
        read: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
            require: true
        },
    },
    {
        timestamps: true,
    }
)

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;
;