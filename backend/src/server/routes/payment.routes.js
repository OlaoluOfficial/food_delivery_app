const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/auth.middleware');
const PaymentController = require('../controllers/payment.controller');

router.post('/', AuthMiddleware.authenticateUser, PaymentController.charge);
router.post('/webhook', PaymentController.handleWebhook);
router.post('/complete-payment', PaymentController.paymentComplete);

module.exports = router;
