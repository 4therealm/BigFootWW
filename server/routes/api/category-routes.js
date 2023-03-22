const router = require("express").Router();   
const {getCategories, getCategory, createCategory, updateCategory, deleteCategory, createCategoriesBulk } = require("../../controllers/category-controller");

// Set up GET all and POST at /api/categories
router
    .route('/')
      .get(getCategories)
      .post(createCategory);

// Set up POST bulk at /api/categories/bulk
router
    .route('/bulk')
      .post(createCategoriesBulk);
      
// Set up GET one, PUT, and DELETE at /api/categories/:id
router
    .route('/:id')
      .get(getCategory)
      .put(updateCategory)
      .delete(deleteCategory);

    



module.exports = router;