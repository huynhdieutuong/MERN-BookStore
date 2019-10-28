const { validationResult } = require('express-validator');

const Book = require('../models/Book');

module.exports.listBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const book = await Book.create({
      ...req.body,
      seller: req.seller.id
    });
    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.updateBook = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let book = await Book.findById(req.params.id);

    // Check if not book
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Make sure seller ownes book
    if (book.seller.toString() !== req.seller.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update Book
    const { images } = req.body;
    const uptBook = {
      ...req.body,
      images: images.length > 0 ? images : book.images
    };

    book = await Book.findByIdAndUpdate(req.params.id, uptBook, { new: true });
    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    // Check if not book
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Make sure seller ownes book
    if (book.seller.toString() !== req.seller.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete Book
    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: `${book.title} deleted!` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.duplicateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    // Check if not book
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Make sure seller ownes book
    if (book.seller.toString() !== req.seller.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Duplicate Book
    const newBook = await Book.create({
      title: `${book.title} Copy`,
      images: book.images,
      author: book.author,
      price: book.price,
      category: book.category,
      discount: book.discount,
      stock: book.stock,
      body: book.body,
      seller: book.seller
    });
    res.json(newBook);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
