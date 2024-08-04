const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const generateJWT = (user) => {
  const payload = {
    id: user._id, // Adjust based on your User model
    name: user.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Test the JWT generation
const testUser = {
  _id: 'testUserId', // Replace with a real user ID
  name: 'testUserName', // Replace with a real user name
};

const token = generateJWT(testUser);
console.log('Generated JWT:', token);
