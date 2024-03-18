const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/auth.middleware');
const PaymentController = require('../controllers/payment.controller');

router.post('/', AuthMiddleware.authenticateUser, PaymentController.charge);
router.post('/verify-payment', PaymentController.verify);

module.exports = router;
