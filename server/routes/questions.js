import auth from '#middleware/auth';
import { crud, send } from '#middleware/crud';

export default (router, _) =>
  router
    .post('/', crud.create, send)
    .get('/', auth, crud.read, send)
    .get('/:id', auth, crud.read, send)
    .delete('/', auth, crud.del, send)
    .delete('/:id', auth, crud.del, send);
