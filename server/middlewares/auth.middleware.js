const jwt = require('jsonwebtoken');

module.exports.seller = (req, res, next) => {
  // Check if not token
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_SELLER);
    req.seller = decoded.seller;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports.buyer = (req, res, next) => {
  // Check if not token
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_BUYER);
    req.buyer = decoded.buyer;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports.admin = (req, res, next) => {
  // Check if not token
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    req.admin = decoded.admin;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
