const express = require('express');
const router = express.Router();

const {
  getCategories,
  showCategory,
  addCategory,
  deleteCategory,
  updateCategory
} = require('../controllers/categories.controller');

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
// router.get('/', getCategories);

// @route   GET api/categories/:id
// @desc    Get an category
// @access  Public
// router.get('/:id', showCategory);

// @route   POST api/categories
// @desc    Add new category
// @access  Private
// router.post('/', addCategory);

// @route   DELETE api/categories/:id
// @desc    Delete category
// @access  Private
// router.delete('/', deleteCategory);

// @route   PUT api/categories/:id
// @desc    Update category
// @access  Private
// router.put('/', updateCategory);

module.exports = router;
