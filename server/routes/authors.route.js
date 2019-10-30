const express = require('express');
const router = express.Router();

const {
  getAuthors,
  searchAuthors,
  showAuthorBooks,
  addAuthor,
  deleteAuthor
} = require('../controllers/authors.controller');

const validates = require('../validates/author.validate');

const auth = require('../middlewares/auth.middleware');

// @route   GET api/authors
// @desc    Get all authors
// @access  Public
router.get('/', getAuthors);

// @route   GET api/authors/search?q=text
// @desc    Search authors
// @access  Public
router.get('/search', searchAuthors);

// @route   GET api/authors/:author-name
// @desc    Get all books be writed by author
// @access  Public
router.get('/:authorName', showAuthorBooks);

// @route   POST api/authors
// @desc    Add new author
// @access  Private Admin
router.post('/', auth.admin, validates.addAuthor, addAuthor);

// @route   DELETE api/authors/:id
// @desc    Delete author
// @access  Private Admin
router.delete('/:id', auth.admin, deleteAuthor);

module.exports = router;
