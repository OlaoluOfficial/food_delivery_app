const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment.controller');

router.post('/', PaymentController.charge);
router.post('/webhook', PaymentController.handleWebhook);

module.exports = router;
