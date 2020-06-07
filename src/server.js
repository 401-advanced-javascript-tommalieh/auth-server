'use strict';

require('dotenv').config();
const express = require('express');
const authRouter = require('./auth/router.js');
const users = require('./auth/model/user-model.js');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/', authRouter);

module.exports = {
    sever: app,
    start: (port) => {
        app.listen(PORT, () => console.log(`Up on port ${PORT}`));
    }
}