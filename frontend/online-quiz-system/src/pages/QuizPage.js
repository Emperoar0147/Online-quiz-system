import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import Question from '../components/Question';
import Result from '../components/Result';
import './Quiz.css';
import schoolLogo from '../assets/dmmmsu.png'; // Import the logo

const socket = io('http://localhost:5000');

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();

    socket.on('disconnect', () => {
      alert('Disconnected! Please stay on the page.');
      endQuiz();
    });

    const endQuiz = () => {
      setQuizEnded(true);
    };

    return () => {
      socket.off('disconnect');
    };
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizEnded(true);
    }
  };

  if (quizEnded) {
    return <Result score={score} />;
  }

  if (!questions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="quiz-container"
      style={{ backgroundImage: `url(${schoolLogo})` }}
    >
      <h1>Quiz</h1>
      <Question
        question={questions[currentQuestionIndex]}
        handleAnswer={handleAnswer}
      />
    </div>
  );
};

export default QuizPage;
