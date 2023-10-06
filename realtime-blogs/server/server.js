

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
app.use('/auth/', routerWebAuth);
app.use('/api/user/', routerWebUser);
app.use('/api/chat/', routerChat);
app.use('/api/message/', routerMessage);


app.listen(port, () => console.log(`Server ok running on port ${port}`));


