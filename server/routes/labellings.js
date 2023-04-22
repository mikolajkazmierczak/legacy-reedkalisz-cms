import auth from '#middleware/auth';
import { crud, send } from '#middleware/crud';

export default (router, _) =>
  router
    .post('/', auth, crud.create, send)
    .get('/', auth, crud.read, send)
    .get('/:id', auth, crud.read, send)
    .put('/', auth, crud.update, send)
    .put('/:id', auth, crud.update, send)
    .delete('/', auth, crud.del, send)
    .delete('/:id', auth, crud.del, send);
