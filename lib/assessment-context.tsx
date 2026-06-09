import React, { createContext, useContext, useState, useCallback } from "react";
import { AssessmentResult, TraderLevel } from "./types";
import { ASSESSMENT_QUESTIONS, calculateLevel } from "./assessment-data";

interface AssessmentContextType {
  currentQuestionIndex: number;
  answers: number[];
  isCompleted: boolean;
  result: AssessmentResult | null;
  nextQuestion: () => void;
  previousQuestion: () => void;
  selectAnswer: (answerIndex: number) => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(ASSESSMENT_QUESTIONS.length).fill(-1));
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const selectAnswer = useCallback((answerIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answerIndex;
      return newAnswers;
    });
  }, [currentQuestionIndex]);

  const completeAssessment = useCallback(() => {
    // Calculate scores by category
    const scores: Record<string, number> = {
      "Market Basics": 0,
      "Technical Analysis": 0,
      "Risk Management": 0,
      Psychology: 0,
      "Strategy Development": 0,
    };

    const categoryCount: Record<string, number> = {
      "Market Basics": 0,
      "Technical Analysis": 0,
      "Risk Management": 0,
      Psychology: 0,
      "Strategy Development": 0,
    };

    let correctAnswers = 0;

    ASSESSMENT_QUESTIONS.forEach((question, index) => {
      categoryCount[question.category]++;
      if (answers[index] === question.correctAnswer) {
        scores[question.category]++;
        correctAnswers++;
      }
    });

    // Convert to percentages
    Object.keys(scores).forEach((category) => {
      scores[category] = (scores[category] / categoryCount[category]) * 100;
    });

    const totalScore = (correctAnswers / ASSESSMENT_QUESTIONS.length) * 100;
    const level = calculateLevel(scores);

    const assessmentResult: AssessmentResult = {
      userId: "user_" + Date.now(), // Placeholder
      level,
      scores,
      completedAt: new Date(),
      totalScore,
    };

    setResult(assessmentResult);
    setIsCompleted(true);
  }, [answers]);

  const resetAssessment = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers(new Array(ASSESSMENT_QUESTIONS.length).fill(-1));
    setIsCompleted(false);
    setResult(null);
  }, []);

  return (
    <AssessmentContext.Provider
      value={{
        currentQuestionIndex,
        answers,
        isCompleted,
        result,
        nextQuestion,
        previousQuestion,
        selectAnswer,
        completeAssessment,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error("useAssessment must be used within AssessmentProvider");
  }
  return context;
}
