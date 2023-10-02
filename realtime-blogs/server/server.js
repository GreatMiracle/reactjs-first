

const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

const dbConfig = require('./config/dbConfig');

const cors = require("./config/corsConfig");
app.use(cors);

const routerWeb = require('./routers/userRouter');

app.use(express.json());
app.use('/', routerWeb);


app.listen(port, () => console.log(`Server ok running on port ${port}`));


