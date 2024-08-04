const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path if necessary
require('dotenv').config(); // Ensure environment variables are loaded

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    // Create a new user
    const hashedPassword = await bcrypt.hash('1234', 10);
    const user = new User({ name: 'emperor', password: hashedPassword });
    await user.save();
    console.log('User created:', user);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
