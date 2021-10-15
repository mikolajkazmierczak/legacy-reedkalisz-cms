const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(403).send({ error: 'No token provided!' });
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Unauthorized!' });
    req.id = decoded.id;
    next();
  });
};
