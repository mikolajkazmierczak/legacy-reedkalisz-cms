import auth from '#middleware/auth';

export default (router, _) =>
  router.get('/', auth, _.read).get('/:id', auth, _.read);
