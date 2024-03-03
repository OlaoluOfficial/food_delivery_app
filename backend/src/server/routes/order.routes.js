const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');

router.post('/', OrderController.createOrder);

router.get('/', OrderController.getAllOrders);

router.get('/:orderId', OrderController.getOrder);

router.put('/:orderId', OrderController.updateOrder);

module.exports = router;
