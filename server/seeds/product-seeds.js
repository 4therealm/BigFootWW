const { Product } = require('../models');

const productData = [
  {
    product_name: 'kitchen island1',
    price: 4000,
    stock: 1,
    category_id: 1,
  },
  {
    product_name: 'kitchen island2',
    price: 4000,
    stock: 1,
    category_id: 1,
  },
  {
    product_name: 'kitchen island3',
    price: 4000,
    stock: 1,
    category_id: 1,
  },
  {
    product_name: 'shelves1',
    price: 100,
    stock: 25,
    category_id: 1,
  },
  {
    product_name: 'shelves2',
    price: 100,
    stock: 25,
    category_id: 1,
  },
  {
    product_name: 'shelves3',
    price: 100,
    stock: 25,
    category_id: 1,
  },
  {
    product_name: 'epoxy window cutouts1',
    price: 22.99,
    stock: 12,
    category_id: 2,
  },
  {
    product_name: 'epoxy window cutouts2',
    price: 22.99,
    stock: 12,
    category_id: 2,
  },
  {
    product_name: 'epoxy window cutouts3',
    price: 22.99,
    stock: 12,
    category_id: 2,
  },
  {
    product_name: 'cutting board1',
    price: 150,
    stock: 10,
    category_id: 3,
  },
  {
    product_name: 'cutting board2',
    price: 150,
    stock: 10,
    category_id: 3,
  },
  {
    product_name: 'cutting board3',
    price: 150,
    stock: 10,
    category_id: 3,
  },
  {
    product_name: 'wooden box1',
    price: 29.99,
    stock: 22,
    category_id: 4,
  },
  {
    product_name: 'wooden box2',
    price: 29.99,
    stock: 22,
    category_id: 4,
  },
  {
    product_name: 'wooden box3',
    price: 29.99,
    stock: 22,
    category_id: 4,
  },
  {
    product_name: 'wooden spoon1',
    price: 5.99,
    stock: 100,
    category_id: 5,
  },
  {
    product_name: 'wooden spoon2',
    price: 5.99,
    stock: 100,
    category_id: 5,
  },
  {
    product_name: 'wooden spoon3',
    price: 5.99,
    stock: 100,
    category_id: 5,
  },
];

const seedProducts = async () => {
  await Product.insertMany(productData);
};

module.exports = seedProducts;
