const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware')

router.get('/getProfile', AuthMiddleware.authenticateUser, UserController.getProfile);
router.put('/', AuthMiddleware.authenticateUser, UserController.updateUser);
router.get('/delivery', UserController.getDeliveryGuys);
router.delete('/deleteUser/:userId', AuthMiddleware.authenticateUser, UserController.deleteUser);

module.exports = router;
