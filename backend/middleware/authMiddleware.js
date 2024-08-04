const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config'); // Adjust path if necessary

const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('x-auth-token');

  // Check if token is present
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    
    // Attach user information to the request object
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle token verification errors
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
