const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('./models');

const prompts = require('prompts');

function init() {
  // create a user if none exists (input from console)
  User.find().count(async (err, count) => {
    if (!err && count == 0) {
      const questions = [
        { type: 'text', name: 'email', message: 'Email?' },
        { type: 'password', name: 'password', message: 'Password?' },
        { type: 'text', name: 'first_name', message: 'First name?' },
        { type: 'text', name: 'last_name', message: 'Last name?' },
      ];
      const userInput = await prompts(questions);
      userInput.password = bcrypt.hashSync(userInput.password, 10);
      User.create(userInput, err => {
        if (err) console.log('error', err);
        else console.log(`Added "${userInput.email}" to Users collection`);
      });
    }
  });
}

exports.connect = () => {
  // Connecting to the database
  const { MONGO_URI } = process.env;
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to database');
      init();
    })
    .catch(error => {
      console.log('Database connection failed. Exiting now...');
      console.error(error);
      process.exit(1);
    });
};
