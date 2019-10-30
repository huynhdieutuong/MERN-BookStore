const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Buyer = require('../models/Buyer');

module.exports.register = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { firstName, lastName, email, password, phone, address } = req.body;
  firstName = firstName.trim().toLowerCase();
  lastName = lastName.trim().toLowerCase();
  try {
    // Check if buyer already exists
    const buyer = await Buyer.findOne({ email });
    if (buyer) {
      return res.status(400).json({ msg: 'Buyer already exists' });
    }

    // Create new buyer
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newBuyer = await Buyer.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phone,
      address
    });

    // Set token
    const payload = {
      buyer: {
        id: newBuyer.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_BUYER,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // Check if not buyer
    const buyer = await Buyer.findOne({ email });
    if (!buyer) {
      return res.status(404).json({ msg: 'Buyer does not exist' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Password incorrect' });
    }

    // Set token
    const payload = {
      buyer: {
        id: buyer.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_BUYER,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.getBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.buyer.id).select('-password');
    res.json(buyer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
