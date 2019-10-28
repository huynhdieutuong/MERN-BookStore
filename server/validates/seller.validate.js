const { check } = require('express-validator');

module.exports.register = [
  check('name', 'Please enter a name of store')
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
    .withMessage('Password must contain a Uppercase char')
];

module.exports.login = [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
];
