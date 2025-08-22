import React, { useContext } from "react";
import {QuizContext}  from "./context/quiz-context.jsx";
import Question from "./components/Question";
import Result from "./components/Result";

const App = () => {
  const {
    selectedCourse,
    quizData,
    currentQuestion,
    userAnswers,
    setCurrentQuestion,
    startCourseQuiz,
    resetQuiz,
  } = useContext(QuizContext);

  const isQuizFinished = currentQuestion >= quizData.length;

  if (!selectedCourse) {
    return (
      <div>
        <h1>IQ-MAC Quiz App</h1>
        <h2>Select a Course:</h2>
         <div className="course-buttons">
          <button onClick={() => startCourseQuiz("math")}>Math</button>
          <button onClick={() => startCourseQuiz("science")}>Science</button>
          <button onClick={() => startCourseQuiz("history")}>History</button>
          <button onClick={() => startCourseQuiz("tech")}>Technology</button>
         </div>
      </div>
    );
  }

  if (isQuizFinished) {
    const correctAnswers = userAnswers.filter(
      (answer, index) => answer === quizData[index]?.answer
    ).length;

    return (
      <Result
        total={quizData.length}
        correct={correctAnswers}
        onRestart={resetQuiz}
      />
    );
  }

  return <Question />;
};

export default App;
