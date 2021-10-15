const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Category',
  new mongoose.Schema({
    path: { type: [Number], unique: true },
    title: { type: String, unique: true },
    codename: { type: String, unique: true },
    description: String,
    image: String,
    icon: String,
  })
);
