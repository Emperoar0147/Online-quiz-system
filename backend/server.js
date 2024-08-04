// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend URL
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Ensure this path is correct
app.use('/api/quiz', require('./routes/quizRoutes')); // Ensure this path is correct

// Test Route
app.get('/test', (req, res) => res.send('Test route working'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack
  res.status(500).send('Something broke!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
