const { Product } = require('../models');
const Common = require('./common');
const Author = require('./author');
const { getUser } = require('./Auth.js');

exports.create = (req, res) => Author.create(req, res, Product);
exports.updateMany = (req, res) => Author.updateMany(req, res, Product);
exports.updateById = (req, res) => Author.updateById(req, res, Product);
exports.getMany = (req, res) => Common.getMany(req, res, Product);
exports.getById = (req, res) => Common.getById(req, res, Product);
exports.deleteMany = (req, res) => Common.deleteMany(req, res, Product);
exports.deleteById = (req, res) => Common.deleteById(req, res, Product);

exports.updateByCode = (req, res) => {
  const user = getUser(req);
  Product.findOneAndUpdate(
    { code: req.params.code },
    { ...req.body, updated_by: user },
    (err, product) => {
      if (err) return res.status(500).send({ error: err });
      if (!product)
        return res.status(404).send({ error: 'Product not found.' });
      return res.status(201).send({ message: 'Product updated.' });
    }
  );
};

exports.getByCode = (req, res) => {
  Product.findOne({ code: req.params.code }, (err, product) => {
    if (err) return res.status(500).send({ error: err });
    if (!product) return res.status(404).send({ error: 'Product not found.' });
    return res.status(200).json(product);
  });
};

exports.deleteByCode = (req, res) => {
  model.findOneAndDelete({ code: req.params.code }, (err, product) => {
    if (err) return res.status(500).send({ error: err });
    if (!product) return res.status(404).send({ error: `Product not found.` });
    return res.status(200).send({ message: `Product deleted.` });
  });
};
