const { Color } = require('../models');
const Common = require('./common');

exports.create = (req, res) => Common.create(req, res, Color);
exports.updateMany = (req, res) => Common.updateMany(req, res, Color);
exports.updateById = (req, res) => Common.updateById(req, res, Color);
exports.getMany = (req, res) => Common.getAll(req, res, Color);
exports.getById = (req, res) => Common.getById(req, res, Color);
exports.deleteMany = (req, res) => Common.deleteMany(req, res, Color);
exports.deleteById = (req, res) => Common.deleteById(req, res, Color);
