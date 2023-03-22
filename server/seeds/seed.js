const mongoose = require("mongoose");
const connection = require("../config/connection");
const Category = require("../models/Category");
const Product = require("../models/Product");
const axios = require("axios");

const imageGeneratorApi = async (query) => {
  try {
    const response = await axios.get("https://source.unsplash.com/random", {
      params: {
        query: `${query} woodworking`,
      },
    });
    return response.request.res.responseUrl;
  } catch (error) {
    console.error(error);
  }
};

const seed = async () => {
  await connection;

  const categoriesData = [
    { name: "Woodworking Projects" },
    { name: "Hand Tools" },
    { name: "Power Tools" },
    { name: "Woodworking Accessories" },
  ];

  const productsData = [
    { name: "Birdhouse Plans", price: 10, category: 0 },
    { name: "Workbench Plans", price: 20, category: 0 },
    { name: "Chisel Set", price: 50, category: 1 },
    { name: "Hand Saw", price: 30, category: 1 },
    { name: "Cordless Drill", price: 120, category: 2 },
    { name: "Circular Saw", price: 80, category: 2 },
    { name: "Clamps", price: 15, category: 3 },
    { name: "Wood Glue", price: 5, category: 3 },
    { name: "Screwdriver Set", price: 20, category: 1 },
    { name: "Router", price: 100, category: 2 },
    { name: "Sander", price: 60, category: 2 },
    { name: "Table Saw", price: 200, category: 2 },
    { name: "Band Saw", price: 150, category: 2 },
    { name: "Drill Press", price: 80, category: 2 },
    { name: "Miter Saw", price: 100, category: 2 },
    { name: "Jigsaw", price: 60, category: 2 },
    { name: "Planer", price: 150, category: 2 },
    { name: "Workbench", price: 200, category: 3 },
    { name: "Workbench Legs", price: 50, category: 3 },
    { name: "Workbench Top", price: 100, category: 3 },
    { name: "Workbench Clamps", price: 20, category: 3 },
    { name: "Workbench Vise", price: 50, category: 3 },
    { name: "Workbench Drawers", price: 50, category: 3 },
    { name: "Workbench Pegboard", price: 20, category: 3 },
    { name: "Workbench Lights", price: 20, category: 3 },
    { name: "Workbench Power Strip", price: 20, category: 3 },
    { name: "Workbench Dust Collection", price: 20, category: 3 },
    { name: "Workbench Pegboard Hooks", price: 20, category: 3 },
    { name: "Workbench Pegboard Bins", price: 20, category: 3 },
    { name: "Workbench Pegboard Tools", price: 20, category: 3 }
  ];
  
  // Clear the database before seeding
  await Category.deleteMany({});
  await Product.deleteMany({});
  
  const createdCategories = await Category.insertMany(categoriesData);
  
  // Assign a category ObjectId to each product
  productsData.forEach((product, index) => {
    product.category = createdCategories[product.category]._id;
  });
  
  const createdProducts = await Promise.all(
    productsData.map(async (product) => {
      const imageUrl = await imageGeneratorApi(product.name);
      return { ...product, imageUrl };
    })
  );
  
  await Product.insertMany(createdProducts);
  
  console.log("Database seeded successfully.");
  mongoose.connection.close();
  };
  
  seed();
