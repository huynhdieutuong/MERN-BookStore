const { validationResult } = require('express-validator');
const Author = require('../models/Author');
const Book = require('../models/Book');
const upperCaseFirstLetter = require('../utils/upperCaseFirstLetter');

module.exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort('firstName');
    res.json(authors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.searchAuthors = async (req, res) => {
  const text = req.query.q;
  try {
    const authors = await Author.find();
    const filtered = authors.filter(
      author =>
        author.firstName.indexOf(text.toLowerCase()) !== -1 ||
        author.lastName.indexOf(text.toLowerCase()) !== -1
    );
    res.json(filtered);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.showAuthorBooks = async (req, res) => {
  let { authorName } = req.params;
  const regex = /-/gi;
  authorName = authorName.replace(regex, ' ');
  try {
    const books = await Book.find({ author: authorName }).sort('-date');
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.addAuthor = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Add author
  let { firstName, lastName } = req.body;
  firstName = firstName.trim().toLowerCase();
  lastName = lastName.trim().toLowerCase();
  try {
    // Check if author
    let author = await Author.findOne({ firstName });
    if (author) {
      if (author.lastName === lastName) {
        return res.status(400).json({ msg: 'Author already exists' });
      }
    }

    // Create author
    author = await Author.create({ firstName, lastName });
    res.json(author);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    // Check if not author
    if (!author) {
      return res.status(404).json({ msg: 'Author not found' });
    }

    // Delete author
    await Author.findByIdAndDelete(req.params.id);
    const fullName = upperCaseFirstLetter(
      author.firstName + ' ' + author.lastName
    );
    res.json({ msg: `${fullName} deleted!` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
