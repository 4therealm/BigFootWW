const { User } = require('../models');

const userData = [
  {
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    password: 'password123'
  },
  {
    username: 'maxwell',
    email: 'maxwell@gmail.com',
    password: 'password'
  }
];

const seedUsers = async () => {
  await User.insertMany(userData);
};

module.exports = seedUsers;
