const express = require('express');
const router = express.Router();

// Middleware
const { verifyToken } = require('../middleware/auth');

// Controllers
const Auth = require('../controllers/Auth');

router.post('/register', Auth.register);
router.post('/login', Auth.login);
router.get('/logout', Auth.logout);
router.get('/me', verifyToken, Auth.me);

module.exports = router;
