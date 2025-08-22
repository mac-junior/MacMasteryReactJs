import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/quiz-context.jsx";

const Question = () => {
  const {
    quizData,
    currentQuestion,
    setCurrentQuestion,
    userAnswers,
    setAnswerForQuestion,
  } = useContext(QuizContext);

  const questionObj = quizData[currentQuestion];
  const selectedAnswer = userAnswers[currentQuestion];

  // Timer logic
  const [timeLeft, setTimeLeft] = useState(15);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    setTimeLeft(15);
    setTimeUp(false);
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeUp(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    if (timeUp) return; // disable option selection after time's up
    setAnswerForQuestion(currentQuestion, option);
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(currentQuestion + 1); // Show result
    }
  };

  // Progress bar
  const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;
  let progressColor = "#e53935"; // red
  if (progressPercentage > 66) progressColor = "#43a047"; // green
  else if (progressPercentage > 33) progressColor = "#fdd835"; // yellow

  return (
    <div className="app-container">
      {/* Progress Bar */}
      <div
        style={{
          height: "12px",
          width: "100%",
          backgroundColor: "#eee",
          borderRadius: "6px",
          marginBottom: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercentage}%`,
            backgroundColor: progressColor,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Question {currentQuestion + 1}</h2>
        <span style={{ fontSize: "1em", color: timeUp ? "#e53935" : "#555" }}>
          {timeUp ? (
            <strong>Time’s Up!</strong>
          ) : (
            <>Time Left: <strong>{timeLeft}s</strong></>
          )}
        </span>
      </div>

      <p className="question">{questionObj.question}</p>

      {questionObj.options.map((option, index) => (
        <button
          key={index}
          className={"option" + (selectedAnswer === option ? " selected" : "")}
          onClick={() => handleOptionClick(option)}
          disabled={timeUp}
        >
          {option}
        </button>
      ))}

      <div className="nav-buttons">
        <button onClick={goToPrevious} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={goToNext}>
          {currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Question;
