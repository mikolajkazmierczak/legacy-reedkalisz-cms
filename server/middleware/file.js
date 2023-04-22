import file from '#services/file';

export default {
  save: (req, res) => {
    try {
      // add a form to the field with the folder (ex. /products/PRODUCT_CODE)
      // then concat to create a path (ex. /products/PRODUCT_CODE/FILENAME.js)
      console.log(1);
      const folder = file.getFolder(req);
      console.log(2);
      const upload = file.save(folder);
      console.log(3);
      return upload.single('file');
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
  rename: async (req, res) => {
    try {
      const { oldFilename, newFilename } = req.body;
      const folder = file.getFolder(req);
      await file.rename(folder, oldFilename, newFilename);
      res.status(200).json({});
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
  send: (req, res) => {
    try {
      const folder = file.getFolder(req);
      res.status(200).json({ folder: folder, filename: req.file });
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
  del: async (req, res) => {
    try {
      const { filename } = req.body;
      const folder = file.getFolder(req);
      await file.del(folder, filename);
      res.status(200).json({});
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    }
  },
};
