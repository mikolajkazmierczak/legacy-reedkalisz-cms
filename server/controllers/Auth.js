const bcrypt = require('bcryptjs');
const { User } = require('../models');

function startSession(req, user) {
  req.session._id = user._id;
  req.session.first_name = user.first_name;
  req.session.last_name = user.last_name;
}

exports.getUser = req => {
  return {
    _id: req.session._id,
    first_name: req.session.first_name,
    last_name: req.session.last_name,
  };
};

exports.register = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ error: err });
    if (user) return res.status(404).send({ error: 'User already exists.' });
    User.create(
      {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      },
      (err, user) => {
        if (err) return res.status(500).send({ error: err });

        startSession(req, user);
        return res.status(200).send({ message: 'Registered! Authenticated.' });
      }
    );
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ error: err });
    if (!user) return res.status(404).send({ error: 'No user found.' });

    // check if the password is valid
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid)
      return res.status(401).send({ error: 'Password is invalid.' });

    startSession(req, user);
    return res.status(200).send({ message: 'Logged in! Authenticated.' });
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  return res.send({ message: 'Logged out.' });
};

exports.me = (req, res) => {
  User.findById(req.session._id, '-password', (err, user) => {
    if (err) return res.status(500).send({ error: err });
    if (!user) return res.status(404).send({ error: 'No user found.' });
    return res.status(200).send(user);
  });
};
