

const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

const dbConfig = require('./config/dbConfig');

const corsConfig = require("./config/corsConfig");
app.use(corsConfig);

const routerWebAuth = require('./routers/authRouter');
const routerWebUser = require('./routers/userRouter');

app.use(express.json());
app.use('/auth/', routerWebAuth);
app.use('/api/user/', routerWebUser);


app.listen(port, () => console.log(`Server ok running on port ${port}`));


