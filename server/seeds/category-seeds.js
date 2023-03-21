const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Furniture',
  },
  {
    category_name: 'Art',
  },
  {
    category_name: 'Cutting Boards',
  },
  {
    category_name: 'Boxes',
  },
  {
    category_name: 'kitchen utensils',
  },
];

const seedCategories = async () => {
  await Category.insertMany(categoryData);
};

module.exports = seedCategories;
