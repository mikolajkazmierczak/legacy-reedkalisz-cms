const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Color',
  new mongoose.Schema({
    name: String,
    hex: String,
  })
);
