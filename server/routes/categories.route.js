const express = require('express');
const router = express.Router();

const {
  getCategories,
  searchCategories,
  showCategoryBooks,
  addCategory,
  deleteCategory
} = require('../controllers/categories.controller');

const validates = require('../validates/category.validate');

const auth = require('../middlewares/auth.middleware');

// @route   GET api/categories
// @desc    Get all Categories
// @access  Public
router.get('/', getCategories);

// @route   GET api/categories/search?q=text
// @desc    Search Categories
// @access  Public
router.get('/search', searchCategories);

// @route   GET api/categories/:category-name
// @desc    Get all books by Category
// @access  Public
router.get('/:categoryName', showCategoryBooks);

// @route   POST api/categories
// @desc    Add new Category
// @access  Private Admin
router.post('/', auth.admin, validates.addCategory, addCategory);

// @route   DELETE api/categories/:id
// @desc    Delete Category
// @access  Private Admin
router.delete('/:id', auth.admin, deleteCategory);

module.exports = router;
