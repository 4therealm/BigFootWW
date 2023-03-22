const mongoose = require("mongoose");
const connection = require("../config/connection");
const Category = require("../models/Category");
const Product = require("../models/Product");
const products = require("./products.js");

const seed = async () => {
  await connection;

  const categoriesData = [
    { name: "Woodworking Projects" },
    { name: "Hand Tools" },
    { name: "Power Tools" },
    { name: "Woodworking Accessories" },
  ];

  // Clear the database before seeding
  await Category.deleteMany({});
  await Product.deleteMany({});

  const createdCategories = await Category.insertMany(categoriesData);

  // Assign a category ObjectId to each product
  products.forEach((product, index) => {
    product.category = createdCategories[product.category]._id;
  });

  await Product.insertMany(products);

  console.log("Database seeded successfully.");
  mongoose.connection.close();
};

seed();
