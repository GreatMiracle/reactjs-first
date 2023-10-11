

const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

const dbConfig = require('./config/dbConfig');

const corsConfig = require("./config/corsConfig");
app.use(corsConfig);

const routerWebAuth = require('./routers/authRouter');
const routerWebUser = require('./routers/userRouter');
const routerChat = require('./routers/chatRouter');
const routerMessage = require('./routers/messageRouter');
app.use(express.json());

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        // allowedHeaders: ["Authorization"],
        // credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('Connected with socket-ID:', socket.id);

    // Phản hồi cho máy khách
    socket.on('join-room', (userId) => {
        console.log("user join:", userId);
        socket.join(userId)
    });

    //send message to clients (who are present in members array)
    socket.on('send-msg', (message) => {
        console.log('send-msg', message);
        io.to(message.members[0])
            .to(message.members[1])
            .emit("received-msg", message)
    });

    //clear-unread-message
    socket.on('clear-unread-message', (message) => {
        console.log('clear-unread-message', message);
        io.to(message.members[0])
            .to(message.members[1])
            .emit("unread-message-cleared", message)
    });

    //typing
    socket.on('typing', (message) => {
        console.log('typing', message);
        io.to(message.members[0])
            .to(message.members[1])
            .emit("started-typing", message)
    });


});





app.use('/auth/', routerWebAuth);
app.use('/api/user/', routerWebUser);
app.use('/api/chat/', routerChat);
app.use('/api/message/', routerMessage);

httpServer.listen(port, () => console.log(`Server ok running on port ${port}`));


