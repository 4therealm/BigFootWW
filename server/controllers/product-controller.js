const Product = require('../models/Product');
const s3 = require('../config/aws-config');
const fs = require('fs');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a single product by ID
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Bulk create products
const createProductsBulk = async (req, res) => {
  try {
    // Assume req.body is an array of product objects
    const productsData = req.body;

    // Validate the input (optional)
    if (!Array.isArray(productsData)) {
      res.status(400).json({ message: 'Input should be an array of product objects' });
      return;
    }

    // Insert the products in bulk
    const createdProducts = await Product.insertMany(productsData);
    res.status(201).json(createdProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updateProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(updateProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const uploadImageToS3 = async (filePath, bucketName) => {
  // Read the image file
  const fileContent = fs.readFileSync(filePath);

  // Set up the S3 upload parameters
  const params = {
    Bucket: bucketName,
    Key: `images/${Date.now()}_${path.basename(filePath)}`, // Filename with a timestamp prefix
    Body: fileContent,
    ContentType: 'image/jpeg', // Replace with the actual content type of your image (e.g., 'image/png' for PNG images)
    ACL: 'public-read', // Make the image publicly accessible
  };

  // Upload the image to S3
  const response = await s3.upload(params).promise();
  return response.Location; // Return the URL of the uploaded image
};



module.exports = {
  getProducts,
  getProduct,
  createProduct,
  createProductsBulk,
  updateProduct,
  deleteProduct
}

// Path: server\routes\product-routes.