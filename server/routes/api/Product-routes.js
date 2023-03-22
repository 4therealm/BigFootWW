const router = require("express").Router();   
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct, createProductsBulk } = require("../../controllers/product-controller");
const {uploadImageToS3} = require("../../config/aws-config");

// Set up GET all and POST at /api/products
router
    .route('/')
      .get(getProducts)
      .post(createProduct);

// Set up POST bulk at /api/products/bulk
router
    .route('/bulk')
      .post(createProductsBulk);

router.post('/upload/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const imagePath = req.file.path; // Replace this with the actual path of the uploaded image on your server
    const bucketName = 'your-s3-bucket-name';

    // Upload the image to S3 and get the image URL
    const imageUrl = await uploadImageToS3(imagePath, bucketName);

    // Update the product with the new imageUrl
    const updatedProduct = await updateProduct(productId, { imageUrl });

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Image uploaded successfully', imageUrl: updatedProduct.imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Set up GET one, PUT, and DELETE at /api/products/:id
router
    .route('/:id')
      .get(getProduct)
      .put(updateProduct)
      .delete(deleteProduct);

module.exports = router;
