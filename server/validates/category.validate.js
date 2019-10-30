const { check } = require('express-validator');

module.exports.addCategory = [
  check('name', 'Please enter a name')
    .not()
    .isEmpty()
];
