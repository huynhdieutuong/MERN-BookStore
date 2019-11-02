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

module.exports.updateBook = [
  check('title', 'Title is required')
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

module.exports.addReview = [
  check('reviewStar', 'Please select star')
    .not()
    .isEmpty(),
  check('reviewComment', 'Please enter a comment')
    .not()
    .isEmpty()
];
