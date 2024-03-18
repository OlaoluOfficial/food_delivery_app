const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.post('/', AuthMiddleware.authenticateUser, OrderController.createOrder);

router.get('/', OrderController.getAllOrders);

router.get('/:orderId', OrderController.getOrder);

router.put('/:orderId', AuthMiddleware.authenticateUser, OrderController.updateOrder);

module.exports = router;
