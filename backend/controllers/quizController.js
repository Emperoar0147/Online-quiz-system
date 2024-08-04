// controllers/quizController.js
const getQuiz = async (req, res) => {
    try {
      // Retrieve quiz data from database or other source
      const quizzes = await Quiz.find(); // Adjust as necessary
      res.json(quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = { getQuiz };
  