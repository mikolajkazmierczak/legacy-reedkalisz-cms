const express = require('express');
const router = express.Router();

// Middleware
const { verifyLogin } = require('../middleware/auth');

// Controllers
const Color = require('../controllers/Color');

router.post('/', verifyLogin, Color.create);
router.put('/', verifyLogin, Color.updateMany);
router.put('/:id', verifyLogin, Color.updateById);
router.get('/', Color.getMany);
router.get('/:id', Color.getById);
router.delete('/', verifyLogin, Color.deleteMany);
router.delete('/:id', verifyLogin, Color.deleteById);

module.exports = router;
