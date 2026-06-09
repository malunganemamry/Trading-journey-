/**
 * LogieFX Data Types and Models
 */

export type TraderLevel = "Beginner" | "Intermediate" | "Advanced";

export interface AssessmentQuestion {
  id: string;
  category: AssessmentCategory;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export type AssessmentCategory =
  | "Market Basics"
  | "Technical Analysis"
  | "Risk Management"
  | "Psychology"
  | "Strategy Development";

export interface AssessmentResult {
  userId: string;
  level: TraderLevel;
  scores: Record<AssessmentCategory, number>;
  completedAt: Date;
  totalScore: number;
}

export interface UserProgress {
  userId: string;
  level: TraderLevel;
  currentStage: number;
  overallProgress: number;
  streak: number;
  lessonsCompleted: number;
  tradesRecorded: number;
  learningTimeThisWeek: number;
  knowledgeScore: number;
  psychologyScore: number;
  riskManagementScore: number;
  strategyScore: number;
  overallTraderScore: number;
}

export interface LearningStage {
  id: number;
  name: string;
  description: string;
  lessons: Lesson[];
  unlockRequirements: string;
  isUnlocked: boolean;
}

export interface Lesson {
  id: string;
  stageId: number;
  title: string;
  category: AssessmentCategory;
  content: string;
  videoRecommendations: VideoRecommendation[];
  quiz: Quiz;
  estimatedTime: number;
  isCompleted: boolean;
}

export interface VideoRecommendation {
  id: string;
  title: string;
  url: string;
  duration: number;
  level: TraderLevel;
  watched: boolean;
  helpful: boolean | null;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Trade {
  id: string;
  userId: string;
  date: Date;
  market: "Forex" | "Stocks" | "Crypto";
  entryPrice: number;
  exitPrice: number;
  riskPercentage: number;
  reasonForEntry: string;
  screenshotUrl?: string;
  lessonLearned: string;
  profitLoss: number;
  profitLossPercentage: number;
  isWin: boolean;
}

export interface TradeStatistics {
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  averageRiskReward: number;
  totalProfit: number;
  largestWin: number;
  largestLoss: number;
  consecutiveWins: number;
  consecutiveLosses: number;
}

export interface TradingStrategy {
  id: string;
  userId: string;
  name: string;
  market: "Forex" | "Stocks" | "Crypto";
  tradingStyle: "Scalping" | "Day Trading" | "Swing Trading";
  entryRules: string;
  exitRules: string;
  riskRules: string;
  tradingSession: string;
  createdAt: Date;
}

export interface PsychologyScenario {
  id: string;
  situation: string;
  options: PsychologyOption[];
  correctOptionIndex: number;
  explanation: string;
}

export interface PsychologyOption {
  label: string;
  text: string;
}

export interface PsychologyScore {
  userId: string;
  disciplineScore: number;
  emotionalControlScore: number;
  consistencyScore: number;
  scenariosCompleted: number;
}

export interface PropFirmPrep {
  userId: string;
  dailyDrawdown: number;
  maxDrawdown: number;
  profitTarget: number;
  consistency: number;
  readinessScore: number;
  isReady: boolean;
}

export interface BookRecommendation {
  id: string;
  title: string;
  author: string;
  level: TraderLevel;
  summary: string;
  keyLessons: string[];
  progressPercentage: number;
}
