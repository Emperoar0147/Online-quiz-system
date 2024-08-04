import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css'; // Correct path to Quiz.css

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('/api/questions');
      setQuestions(response.data);
    };

    fetchQuestions();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleFinishQuiz = () => {
    setShowScore(true);
  };

  if (showScore) {
    return (
      <div className="quiz-container">
        <h1>Quiz Completed</h1>
        <p>Your score is {score} out of {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="question-section">
        <div className="question-count">
          <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
        </div>
        <div className="question-text">{questions[currentQuestionIndex].questionText}</div>
      </div>
      <div className="answer-section">
        {questions[currentQuestionIndex].answerOptions.map((answerOption, index) => (
          <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
            {answerOption.answerText}
          </button>
        ))}
      </div>
      <div className="timer">
        Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
      </div>
    </div>
  );
};

export default QuizPage;
