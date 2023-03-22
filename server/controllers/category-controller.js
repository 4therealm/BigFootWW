const Category = require("../models/Category");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by ID
const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk create categories
const createCategoriesBulk = async (req, res) => {
  try {
    // Assume req.body is an array of category objects
    const categoriesData = req.body;

    // Validate the input (optional)
    if (!Array.isArray(categoriesData)) {
      res.status(400).json({ message: 'Input should be an array of category objects' });
      return;
    }

    // Insert the categories in bulk
    const createdCategories = await Category.insertMany(categoriesData);
    res.status(201).json(createdCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  createCategoriesBulk
};
