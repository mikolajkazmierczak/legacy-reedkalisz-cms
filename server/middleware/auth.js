export default (req, res, next) => {
  // verify login
  if (req.session._id) return next();
  res.status(401).json({ error: 'Unauthorized!' });
};
