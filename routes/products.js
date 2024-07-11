const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controller/productController');

router.get('/', productController.getAllProducts);

module.exports = router;
