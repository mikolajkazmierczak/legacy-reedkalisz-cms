import multer from 'multer';
import fs from 'fs/promises';

export default {
  save: (folder, filetypes = /jpg|jpeg|png|webp/) => {
    const fileFilter = (req, file, cb) => {
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) return cb(null, true);
      else cb('Error: Images Only!');
    };
    return multer({
      dest: folder,
      fileFilter,
      limits: { fileSize: 2000000 },
    });
  },
  rename: async (folder, oldFilename, newFilename) => {
    const oldPath = folder + '/' + oldFilename;
    const newPath = folder + '/' + newFilename;
    return await fs.rename(oldPath, newPath);
  },
  del: async (folder, filename) => {
    const path = folder + '/' + filename;
    return await fs.unlink(path);
  },
  getFolder: req => req.path.replace('/admin', '').replace('/file', ''),
};
