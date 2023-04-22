import crudService from '#services/crud';

export const crud = {
  create: async (req, res, next) => {
    try {
      const { Model } = req;
      await crudService.create(req, Model, req.body);
      req.json = {};
      next();
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
  read: async (req, res, next) => {
    try {
      const { Model } = req;
      const { id, limit, offset } = req.params;
      const count = await Model.estimatedDocumentCount();
      const docs = id
        ? await crudService.read(Model, id, { limit: 1, offset: 0 })
        : await crudService.read(Model, req.body.query, { limit, offset });
      req.json = { count, docs };
      next();
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
  update: async (req, res, next) => {
    try {
      const { Model } = req;
      const { id } = req.params;
      let body = req.body;
      if (!Array.isArray(body)) body = [body];
      for (const elem of body) {
        if (id) await crudService.update(req, Model, id, elem);
        else await crudService.update(req, Model, elem.query, elem.updates);
      }
      req.json = {};
      next();
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
  del: async (req, res, next) => {
    try {
      const { Model } = req;
      const { id } = req.params;
      if (id) await crudService.del(Model, id);
      else await crudService.del(Model, req.body.query);
      req.json = {};
      next();
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
};

export const send = (req, res) => {
  res.status(200).json(req.json);
};

export default crud;
