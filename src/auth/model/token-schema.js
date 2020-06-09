'use strict';

const mongoose = require('mongoose');

const tokens = mongoose.Schema({
  value: { type: String, required: true },
});

module.exports = mongoose.model('tokens', tokens);