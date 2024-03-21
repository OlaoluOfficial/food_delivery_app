const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.post('/', AuthMiddleware.authenticateUser, CartController.addItemToCart);
router.delete('/:itemId', AuthMiddleware.authenticateUser, CartController.removeItemFromCart);
router.get('/', AuthMiddleware.authenticateUser, CartController.getUserCart);

module.exports = router;
