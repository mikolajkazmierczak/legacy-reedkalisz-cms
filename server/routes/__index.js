import auth from '#middleware/auth';

export default (router, _) =>
  router.get('/', auth, (req, res) => res.json({ message: '/' }));
