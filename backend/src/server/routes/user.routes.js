const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware')

router.post('/', AuthMiddleware.authenticateUser, UserController.getProfile);
module.exports = router;
