import auth from '#middleware/auth';
import { crud, send } from '#middleware/crud';
import file from '#middleware/file';
const upload = file.save();

export default (router, _) =>
  router
    .post('/file', auth, upload, file.send)
    .put('/file', auth, file.rename)
    .delete('/file', auth, file.del)
    .post('/', auth, crud.create, send)
    .get('/', crud.read, send)
    .get('/:id', crud.read, send)
    .put('/', auth, crud.update, send)
    .put('/:id', auth, crud.update, send)
    .delete('/', auth, crud.del, send)
    .delete('/:id', auth, crud.del, send);
