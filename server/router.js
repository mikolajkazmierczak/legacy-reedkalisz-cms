import express from 'express';
import pluralize from 'pluralize';
import fs from 'fs/promises';

function kebabToPascal(string) {
  // file-name -> FileName
  const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);
  const words = string.split('-');
  const Words = words.map(word => capitalize(word));
  return Words.join('');
}

async function fetchDir(path) {
  try {
    const dir = await fs.readdir(path);
    const files = dir
      .filter(f => f.includes('.js'))
      .map(f => f.replace('.js', ''));
    const folders = dir.filter(f => !f.includes('.js'));
    return { path, dir, files, folders };
  } catch (err) {
    return null; // path does not exist
  }
}

async function module(type, dir, file, { Model = null, Ctrll = null } = {}) {
  if (!(dir && dir.files.includes(file))) return null;
  const module = await import(`../${dir.path}/${file}.js`);
  switch (type) {
    case 'route':
      const router = express.Router();
      router.use((req, res, next) => {
        req.Model = Model;
        next();
      });
      return module.default(router, Ctrll);
    case 'model':
      return module.default;
    case 'ctrll':
      return module.default(Model);
  }
}

export default async function mapRoutes(app, path = '', pathPascal = '') {
  const routes = await fetchDir('./server/routes' + path);
  const models = await fetchDir('./server/models' + pathPascal);
  const ctrlls = await fetchDir('./server/controllers' + pathPascal);
  for (const file of routes.files) {
    const endpoint = file === '__index' ? '' : '/' + file;
    const filePascal = kebabToPascal(pluralize(file, 1));
    const Model = await module('model', models, filePascal);
    const Ctrll = await module('ctrll', ctrlls, filePascal, { Model });
    const Route = await module('route', routes, file, { Model, Ctrll });
    app.use('/api' + path + endpoint, Route);
  }
  for (const folder of routes.folders) {
    const folderPascal = kebabToPascal(pluralize(folder, 1));
    await mapRoutes(app, path + '/' + folder, pathPascal + '/' + folderPascal);
  }
}
