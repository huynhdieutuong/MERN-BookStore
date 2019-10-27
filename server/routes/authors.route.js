const express = require('express');
const router = express.Router();

const {
  getAuthors,
  showAuthor,
  addAuthor,
  deleteAuthor,
  updateAuthor
} = require('../controllers/authors.controller');

// @route   GET api/authors
// @desc    Get all authors
// @access  Public
// router.get('/', getAuthors);

// @route   GET api/authors/:id
// @desc    Get an author
// @access  Public
// router.get('/:id', showAuthor);

// @route   POST api/authors
// @desc    Add new author
// @access  Private
// router.post('/', addAuthor);

// @route   DELETE api/authors/:id
// @desc    Delete author
// @access  Private
// router.delete('/', deleteAuthor);

// @route   PUT api/authors/:id
// @desc    Update author
// @access  Private
// router.put('/', updateAuthor);

module.exports = router;
