import crud from '#services/crud';

export default _ => ({
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const docs = id
        ? await crud.read(_, id, { limit: 1, props: '-password' })
        : await crud.read(_, req.body.query, { all: true, props: '-password' });
      res.status(200).json(docs);
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
});
