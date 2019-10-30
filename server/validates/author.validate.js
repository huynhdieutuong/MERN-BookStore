const { check } = require('express-validator');

module.exports.addAuthor = [
  check('firstName', 'Please enter a first name')
    .not()
    .isEmpty(),
  check('lastName', 'Please enter a last name')
    .not()
    .isEmpty()
];
