const express = require('express');
const router = express.Router();

// Middleware
const { verifyLogin } = require('../middleware/auth');

// Controllers
const User = require('../controllers/User');

router.get('/:id', verifyLogin, User.user);

module.exports = router;
