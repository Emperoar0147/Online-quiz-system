const express = require('express');
const router = express.Router();
const { getQuiz } = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the /quiz route
router.get('/quiz', authMiddleware, getQuiz);

module.exports = router;
