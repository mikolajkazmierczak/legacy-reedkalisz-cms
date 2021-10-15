const express = require('express');
const router = express.Router();

// Middleware
const { verifyLogin } = require('../middleware/auth');

// Controllers
const Product = require('../controllers/Product');

router.post('/', verifyLogin, Product.create);
router.put('/', verifyLogin, Product.updateMany);
router.put('/:id', verifyLogin, Product.updateById);
router.put('/code/:code', verifyLogin, Product.updateByCode);
router.get('/', Product.getMany);
router.get('/:id', Product.getById);
router.get('/code/:code', Product.getByCode);
router.delete('/', verifyLogin, Product.deleteMany);
router.delete('/:id', verifyLogin, Product.deleteById);
router.delete('/code/:code', verifyLogin, Product.deleteByCode);

module.exports = router;
