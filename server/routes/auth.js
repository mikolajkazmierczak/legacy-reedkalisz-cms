import auth from '#middleware/auth';

export default (router, _) =>
  router
    .post('/register', auth, _.register)
    .post('/login', _.login)
    .get('/logout', auth, _.logout)
    .get('/me', auth, _.me);
