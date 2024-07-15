const express = require('express');
const router = express.Router();
const { getAllProducts, updateProductById, deleteProductById } = require('../controller/productController');
const { cookieJwtAuth } = require('../middleware/cookieAuth'); // Ensure this import is correct

router.get('/', cookieJwtAuth, getAllProducts);
router.put('/:id', cookieJwtAuth, updateProductById);
router.delete('/:id', cookieJwtAuth, deleteProductById);

module.exports = router;

