import React from 'react';

const Question = ({ question, handleAnswer }) => {
  return (
    <div>
      <h2>{question.question}</h2>
      <div>
        {question.answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(answer.isCorrect)}>
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
