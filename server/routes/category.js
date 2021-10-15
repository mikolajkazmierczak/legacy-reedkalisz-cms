const express = require('express');
const router = express.Router();

// Middleware
const { verifyLogin } = require('../middleware/auth');

// Controllers
const Category = require('../controllers/Category');

router.post('/', verifyLogin, Category.create);
router.put('/', verifyLogin, Category.updateMany);
router.put('/:id', verifyLogin, Category.updateById);
router.get('/', Category.getMany);
router.get('/:id', Category.getById);
router.get('/:codename', Category.getByCodename);
router.delete('/', verifyLogin, Category.deleteMany);
router.delete('/:id', verifyLogin, Category.deleteById);

module.exports = router;
