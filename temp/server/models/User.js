const mongoose = require('mongoose');

module.exports = mongoose.model(
  'User',
  new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    first_name: String,
    last_name: String,
  })
);
