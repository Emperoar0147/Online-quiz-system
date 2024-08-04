const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Load User model
const User = require('./models/User'); // Adjust the path if necessary

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Find the user and update their password
    const user = await User.findOne({ name: 'empe' }); // Replace with your username
    if (!user) {
      console.log('User not found');
      mongoose.connection.close();
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('1234', saltRounds); // Replace with your password
    user.password = hashedPassword;
    await user.save();

    console.log('User password updated');
    mongoose.connection.close();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();
