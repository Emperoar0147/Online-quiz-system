const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  answer: {
    type: String,
    required: true,
  },
});

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [QuestionSchema],
});

module.exports = mongoose.model('Quiz', QuizSchema);
