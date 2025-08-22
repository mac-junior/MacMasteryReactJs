import React, { createContext, useState } from "react";

// Import question sets
import mathQuestions from "../data/questions/maths";
import scienceQuestions from "../data/questions/science";
import historyQuestions from "../data/questions/history";
import techQuestions from "../data/questions/tech";

export const QuizContext = createContext();

// Map of all course questions
const questionMap = {
  math: mathQuestions,
  science: scienceQuestions,
  history: historyQuestions,
  tech: techQuestions,
};

export const QuizProvider = ({ children }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Call this when a course is selected
  const startCourseQuiz = (courseId) => {
    const courseQuestions = questionMap[courseId] || [];
    setSelectedCourse(courseId);
    setQuizData(courseQuestions);
    setCurrentQuestion(0);
    setUserAnswers(courseQuestions.map(() => null));
  };

  const setAnswerForQuestion = (index, answer) => {
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[index] = answer;
      return updated;
    });
  };

  const resetQuiz = () => {
    setSelectedCourse(null);
    setQuizData([]);
    setCurrentQuestion(0);
    setUserAnswers([]);
  };

  return (
    <QuizContext.Provider
      value={{
        selectedCourse,
        quizData,
        currentQuestion,
        setCurrentQuestion,
        userAnswers,
        setAnswerForQuestion,
        resetQuiz,
        startCourseQuiz, // ✅ expose this
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
