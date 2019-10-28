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
