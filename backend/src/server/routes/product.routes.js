const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.post('/', ProductController.createProduct);

router.get('/', ProductController.getAllProducts);

router.get('/:productId', ProductController.getProduct);

router.put('/:productId', ProductController.updateProduct)

router.delete('/:productId', ProductController.deleteProduct)

module.exports = router;
