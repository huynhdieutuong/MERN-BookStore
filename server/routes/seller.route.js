const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getSeller
} = require('../controllers/seller.controller');

const validates = require('../validates/seller.validate');

// @route   POST  api/seller/register
// @desc    Register seller
// @access  Public
router.post('/register', validates.register, register);

// @route   POST  api/seller/login
// @desc    Login seller
// @access  Public
// router.post('/register', login);

// @route   POST  api/seller
// @desc    Register seller
// @access  Private
// router.get('/', getSeller);

module.exports = router;
