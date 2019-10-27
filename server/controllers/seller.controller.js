const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Seller = require('../models/Seller');

module.exports.register = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    // Check if had seller
    const seller = await Seller.findOne({ email });
    if (seller) {
      return res.status(400).json({ msg: 'Seller already exists' });
    }

    // Create new seller
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newSeller = await Seller.create({
      name,
      email,
      password: hashPassword
    });

    // Set token
    const payload = {
      seller: {
        id: newSeller.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({token})
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
};
