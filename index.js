'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');
console.log(process.env.MONGODB_URI);
console.log(process.env.PORT);
console.log(process.env.CALLBACK_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.start(process.env.PORT);