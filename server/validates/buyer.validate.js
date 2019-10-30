const { check } = require('express-validator');

module.exports.register = [
  check('firstName', 'Please enter a first name')
    .not()
    .isEmpty(),
  check('lastName', 'Please enter a last name')
    .not()
    .isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 chars long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[\@\#\$\%\^\&\*]/)
    .withMessage('Password must contain a special char: @ # $ % ^ & *')
    .matches(/[A-Z]/)
    .withMessage('Password must contain a Uppercase char'),
  check('phone', 'Please enter a valid phone')
    .isLength({ min: 10, max: 10 })
    .matches(/\d\d\d\d\d\d\d\d\d\d/),
  check('address', 'Please enter an address to receive books')
    .not()
    .isEmpty()
];

module.exports.login = [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
];
