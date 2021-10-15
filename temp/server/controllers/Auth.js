const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const { JWT_SECRET_KEY, JWT_COOKIE_DOMAIN } = process.env;

function signToken(user) {
  return jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: '15min',
  });
}

function createCookie(token) {
  let options = {
    path: '/',
    httpOnly: true,
    secure: true,
  };
  if (JWT_COOKIE_DOMAIN) options['domain'] = JWT_COOKIE_DOMAIN;
  return ['jwt', token, options];
}

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(500).send({ error: err });
    if (!user) return res.status(404).send({ error: 'No user found.' });

    // check if the password is valid
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).send({ error: 'Password is invalid.' });

    // if user is found and password is valid
    const token = signToken(user);
    const cookie = createCookie(token);

    console.log(token);

    // return the token using a httpOnly cookie
    return res
      .status(200)
      .cookie(...cookie)
      .send({ message: 'Authenticated.' });
  });
};

exports.logout = (req, res) => {
  return res
    .status(200)
    .clearCookie('jwt', { path: '/' })
    .send({ message: 'Logged out.' });
};

exports.register = (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  }).exec((err, user) => {
    if (err) return res.status(500).send({ error: err });
    if (user) return res.status(404).send({ error: 'User already exists.' });

    // create a token and cookie
    const token = signToken(user);
    const cookie = createCookie(token);

    // return the token using a httpOnly cookie
    return res
      .status(200)
      .cookie(...cookie)
      .send({ message: 'Authenticated.' });
  });
};

exports.me = (req, res) => {
  // console.log(req.id);
  User.findById(req.id, '-password').exec((err, user) => {
    if (err) return res.status(500).send({ error: err });
    if (!user) return res.status(404).send({ error: 'No user found.' });
    return res.status(200).send(user);
  });
};
