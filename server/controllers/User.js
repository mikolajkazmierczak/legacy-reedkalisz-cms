const { User } = require('../models');

exports.user = (req, res) => {
  User.findById(req.params.id, '-password').exec((err, user) => {
    if (err) return res.status(500).send({ error: err });
    return res.status(200).json(user);
  });
};
