const { check } = require('express-validator');

module.exports.login = [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
];
