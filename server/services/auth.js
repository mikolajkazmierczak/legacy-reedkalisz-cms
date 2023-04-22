import bcrypt from 'bcryptjs';

export default {
  startSession: (req, user) => {
    req.session._id = user._id;
    req.session.firstName = user.firstName;
    req.session.lastName = user.lastName;
  },

  endSession: req => {
    req.session.destroy();
  },

  getSession: req => ({
    _id: req.session._id,
    firstName: req.session.firstName,
    lastName: req.session.lastName,
  }),

  encryptPassword: async password => {
    // auto generate salt and hash a password
    return await bcrypt.hash(password, 10);
  },

  comparePasswords: async (password, user) => {
    // check if the password is valid
    return await bcrypt.compare(password, user.password);
  },
};
