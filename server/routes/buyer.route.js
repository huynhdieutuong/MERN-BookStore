const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getBuyer
} = require('../controllers/buyer.controller');

const validates = require('../validates/buyer.validate');

const auth = require('../middlewares/auth.middleware');

// @route   POST  api/buyer/register
// @desc    Register buyer
// @access  Public
router.post('/register', validates.register, register);

// @route   POST  api/buyer/login
// @desc    Login buyer
// @access  Public
router.post('/login', validates.login, login);

// @route   POST  api/buyer
// @desc    Get buyer
// @access  Private
router.get('/', auth.buyer, getBuyer);

module.exports = router;
