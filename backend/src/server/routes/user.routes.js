const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware')

router.get('/getProfile', AuthMiddleware.authenticateUser, UserController.getProfile);
module.exports = router;
