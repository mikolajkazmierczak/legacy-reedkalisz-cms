const { Category } = require('../models');
const Common = require('./common');

exports.create = (req, res) => Common.create(req, res, Category);
exports.updateMany = (req, res) => Common.updateMany(req, res, Category);
exports.updateById = (req, res) => Common.updateById(req, res, Category);
exports.getMany = (req, res) => Common.getAll(req, res, Category);
exports.getById = (req, res) => Common.getById(req, res, Category);
exports.deleteMany = (req, res) => Common.deleteMany(req, res, Category);
exports.deleteById = (req, res) => Common.deleteById(req, res, Category);

exports.getByCodename = (req, res) => {
  Category.findOne({ code: req.params.codename }, (err, category) => {
    if (err) return res.status(500).send({ error: err });
    if (!category)
      return res.status(404).send({ error: 'Category not found.' });
    return res.status(200).json(category);
  });
};
