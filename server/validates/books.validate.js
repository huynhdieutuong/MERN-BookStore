const { check } = require('express-validator');

module.exports.listBook = [
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('images', 'Please upload images. Maximum size of 5 MB')
    .not()
    .isEmpty(),
  check('author', 'Please select author')
    .not()
    .isEmpty(),
  check('price')
    .matches(/\d/)
    .withMessage('Please enter a number'),
  check('category', 'Please select category')
    .not()
    .isEmpty(),
  check('stock')
    .matches(/\d/)
    .withMessage('Please enter a number'),
  check('body', 'Please enter description')
    .not()
    .isEmpty()
];
