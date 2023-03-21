require('dotenv').config();
const dbConnection = require('../config/connection'); // Replace with the actual path to your connection file
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedUsers = require('./user-seeds');

const seedAll = async () => {
  try {
    await new Promise((resolve) => dbConnection.once('connected', resolve));
    await dbConnection.db.dropDatabase();
    console.log('\n----- DATABASE DROPPED -----\n');
    
    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');
  
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedProducts();
    console.log('\n----- PRODUCTS SEEDED -----\n');

  } catch (error) {
    console.error(error);
  } finally {
    dbConnection.close();
    process.exit(0);
  }
};

seedAll();
