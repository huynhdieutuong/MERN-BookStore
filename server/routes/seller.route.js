const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getSeller
} = require('../controllers/seller.controller');

const auth = require('../middlewares/auth.middleware');

const validates = require('../validates/seller.validate');

// @route   POST  api/seller/register
// @desc    Register seller
// @access  Public
router.post('/register', validates.register, register);

// @route   POST  api/seller/login
// @desc    Login seller
// @access  Public
router.post('/login', validates.login, login);

// @route   POST  api/seller
// @desc    Register seller
// @access  Private
router.get('/', auth.seller, getSeller);

module.exports = router;
