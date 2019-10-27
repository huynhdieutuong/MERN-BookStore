const express = require('express');
const router = express.Router();

const {
  getBooks,
  sortBooks,
  searchBooks,
  showBook,
  listBook,
  deleteBook,
  updateBook
} = require('../controllers/books.controller');

// @route   GET api/books
// @desc    Get all books and sort by newest
// @access  Public
router.get('/', getBooks);

// @route   GET api/books/sort?s=top-seller | top-views | top-discount | price-asc | price-desc
// @desc    Get all books and sort by Top Seller | Top Views | Top Discount | Price: Low to High, High to Low
// @access  Public
router.get('/sort', sortBooks);

// @route   GET api/books/search?q=text
// @desc    Search books by title
// @access  Public
router.get('/search', searchBooks);

// @route   GET api/books/:id
// @desc    Get a book
// @access  Public
router.get('/:id', showBook);

// @route   POST api/books
// @desc    List a new book
// @access  Private
router.post('/', listBook);

// @route   DELETE api/books/:id
// @desc    Delete a book
// @access  Private
router.delete('/:id', deleteBook);

// @route   PUT api/books/:id
// @desc    Update a book
// @access  Private
router.put('/:id', updateBook);

module.exports = router;
