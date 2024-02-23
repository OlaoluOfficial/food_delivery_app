const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.post('/signup', AuthController.register);
router.post('/login', AuthController.login);
module.exports = router;
