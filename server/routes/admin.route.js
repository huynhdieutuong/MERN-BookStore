const express = require('express');
const router = express.Router();

const { login } = require('../controllers/admin.controller');

const validates = require('../validates/admin.validate');

// @route   POST  /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', validates.login, login);

module.exports = router;
