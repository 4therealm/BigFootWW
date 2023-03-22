const router = require("express").Router();   
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct, createProductsBulk } = require("../../controllers/product-controller");

// Set up GET all and POST at /api/products
router
    .route('/')
      .get(getProducts)
      .post(createProduct);


// Set up POST bulk at /api/products/bulk
router
    .route('/bulk')
      .post(createProductsBulk);

// Set up GET one, PUT, and DELETE at /api/products/:id
router
    .route('/:id')
      .get(getProduct)
      .put(updateProduct)
      .delete(deleteProduct);

module.exports = router;

// Path: server\routes\api\index.js
