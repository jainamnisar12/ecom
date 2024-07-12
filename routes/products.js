// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { getAllProducts, updateProductById, deleteProductById } = require('../controller/productController');
// // const validateToken =  require('../middleware/validateTokenHandler')
// const cookieJwtAuth = require('../middleware/cookieAuth')

// router.get('/', cookieJwtAuth, getAllProducts);
// router.put('/:id', updateProductById)
// router.delete('/:id', deleteProductById)

// module.exports = router;

const express = require('express');
const router = express.Router();
const { getAllProducts, updateProductById, deleteProductById } = require('../controller/productController');
const { cookieJwtAuth } = require('../middleware/cookieAuth'); // Ensure this import is correct

router.get('/', cookieJwtAuth, getAllProducts);
router.put('/:id', cookieJwtAuth, updateProductById);
router.delete('/:id', cookieJwtAuth, deleteProductById);

module.exports = router;
