const { validationResult } = require('express-validator');
const Category = require('../models/Category');
const Book = require('../models/Book');
const upperCaseFirstLetter = require('../utils/upperCaseFirstLetter');

module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort('name');
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.searchCategories = async (req, res) => {
  const text = req.query.q;
  try {
    const categories = await Category.find();
    const filtered = categories.filter(
      category => category.name.indexOf(text.toLowerCase()) !== -1
    );
    res.json(filtered);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.showCategoryBooks = async (req, res) => {
  let { categoryName } = req.params;
  const regex = /-/gi;
  categoryName = categoryName.replace(regex, ' ');
  try {
    const books = await Book.find({ category: categoryName }).sort('-date');
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.addCategory = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Add Category
  let { name } = req.body;
  name = name.trim().toLowerCase();
  try {
    // Check if Category
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ msg: 'Category already exists' });
    }

    // Create Category
    category = await Category.create({ name });
    res.json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    // Check if not Category
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    // Delete Category
    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: `${upperCaseFirstLetter(category.name)} deleted!` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
