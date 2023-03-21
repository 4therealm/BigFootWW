const mongoose = require('mongoose');
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedUsers = require('./user-seeds');

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const seedAll = async () => {
  try {
    await mongoose.connection.db.dropDatabase();
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
    mongoose.connection.close();
    process.exit(0);
  }
};

seedAll();
