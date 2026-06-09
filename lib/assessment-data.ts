import { AssessmentQuestion } from "./types";

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Market Basics
  {
    id: "mb1",
    category: "Market Basics",
    question: "What is a stock?",
    options: [
      "A share of ownership in a company",
      "A type of bond issued by governments",
      "A currency exchange rate",
      "A commodity futures contract",
    ],
    correctAnswer: 0,
    explanation:
      "A stock represents a share of ownership in a company. When you buy stock, you become a partial owner of that company.",
  },
  {
    id: "mb2",
    category: "Market Basics",
    question: "What is forex?",
    options: [
      "Foreign exchange market where currencies are traded",
      "A type of stock exchange",
      "A cryptocurrency blockchain",
      "A futures trading platform",
    ],
    correctAnswer: 0,
    explanation:
      "Forex (foreign exchange) is the global market where currencies are traded. It's the largest financial market in the world.",
  },
  {
    id: "mb3",
    category: "Market Basics",
    question: "What is leverage in trading?",
    options: [
      "Using borrowed money to increase position size",
      "A type of stock dividend",
      "A trading strategy using moving averages",
      "The difference between bid and ask prices",
    ],
    correctAnswer: 0,
    explanation:
      "Leverage allows traders to control larger positions with a smaller amount of capital by borrowing from their broker.",
  },
  {
    id: "mb4",
    category: "Market Basics",
    question: "What is liquidity?",
    options: [
      "The ease with which an asset can be bought or sold",
      "The profit made from a trade",
      "The amount of money in your account",
      "The speed of your internet connection",
    ],
    correctAnswer: 0,
    explanation:
      "Liquidity refers to how easily an asset can be converted to cash without significantly affecting its price.",
  },

  // Technical Analysis
  {
    id: "ta1",
    category: "Technical Analysis",
    question: "What does a candlestick represent?",
    options: [
      "Price movement over a specific time period",
      "The total volume traded in a day",
      "The company's earnings report",
      "The inflation rate",
    ],
    correctAnswer: 0,
    explanation:
      "A candlestick shows the open, high, low, and close prices for a specific time period (minute, hour, day, etc.).",
  },
  {
    id: "ta2",
    category: "Technical Analysis",
    question: "What is support in technical analysis?",
    options: [
      "A price level where the asset tends to stop falling",
      "A customer service department",
      "The total number of shares outstanding",
      "The company's balance sheet",
    ],
    correctAnswer: 0,
    explanation:
      "Support is a price level where buying interest is strong enough to prevent the price from falling further.",
  },
  {
    id: "ta3",
    category: "Technical Analysis",
    question: "What is a trend?",
    options: [
      "The general direction of price movement",
      "A popular trading strategy",
      "The volume of trades executed",
      "The broker's commission structure",
    ],
    correctAnswer: 0,
    explanation:
      "A trend is the overall direction in which prices are moving - uptrend, downtrend, or sideways.",
  },
  {
    id: "ta4",
    category: "Technical Analysis",
    question: "What is a chart pattern?",
    options: [
      "Recognizable formations on price charts that suggest future price movement",
      "A list of all trades executed",
      "The broker's trading hours",
      "The company's stock split history",
    ],
    correctAnswer: 0,
    explanation:
      "Chart patterns are visual formations that traders use to predict potential price movements based on historical price action.",
  },

  // Risk Management
  {
    id: "rm1",
    category: "Risk Management",
    question: "What is position sizing?",
    options: [
      "Determining how much capital to risk on each trade",
      "The total number of shares in the market",
      "The size of the trading platform",
      "The broker's account minimum",
    ],
    correctAnswer: 0,
    explanation:
      "Position sizing is a critical risk management technique where you determine how much capital to allocate to each trade.",
  },
  {
    id: "rm2",
    category: "Risk Management",
    question: "What is risk-reward ratio?",
    options: [
      "The ratio of potential profit to potential loss on a trade",
      "The company's debt to equity ratio",
      "The stock's price-to-earnings ratio",
      "The market's volatility index",
    ],
    correctAnswer: 0,
    explanation:
      "Risk-reward ratio compares the amount you risk on a trade to the amount you expect to gain. A 1:2 ratio means risking $1 to make $2.",
  },
  {
    id: "rm3",
    category: "Risk Management",
    question: "What is drawdown?",
    options: [
      "The decline in account value from peak to trough",
      "The daily change in stock price",
      "The broker's fee structure",
      "The trading volume in a session",
    ],
    correctAnswer: 0,
    explanation:
      "Drawdown measures the largest peak-to-trough decline in your account balance, showing the worst-case scenario.",
  },

  // Psychology
  {
    id: "ps1",
    category: "Psychology",
    question: "What is trading fear?",
    options: [
      "The emotion that causes traders to exit winning trades too early",
      "A type of market indicator",
      "A broker's trading restriction",
      "A chart pattern formation",
    ],
    correctAnswer: 0,
    explanation:
      "Trading fear often causes traders to close profitable positions too early, missing out on larger gains.",
  },
  {
    id: "ps2",
    category: "Psychology",
    question: "What is greed in trading?",
    options: [
      "The desire for excessive profits that leads to poor decision-making",
      "A type of investment strategy",
      "A market regulation",
      "A technical indicator",
    ],
    correctAnswer: 0,
    explanation:
      "Greed pushes traders to take excessive risks or hold losing positions too long, hoping for unrealistic profits.",
  },
  {
    id: "ps3",
    category: "Psychology",
    question: "What is revenge trading?",
    options: [
      "Taking excessive risks to quickly recover from losses",
      "A type of hedging strategy",
      "A broker's policy",
      "A market cycle",
    ],
    correctAnswer: 0,
    explanation:
      "Revenge trading is when traders make impulsive, high-risk trades to quickly recover losses, often leading to bigger losses.",
  },
  {
    id: "ps4",
    category: "Psychology",
    question: "What is FOMO in trading?",
    options: [
      "Fear of missing out - entering trades without proper analysis",
      "A type of market order",
      "A broker's commission structure",
      "A technical analysis tool",
    ],
    correctAnswer: 0,
    explanation:
      "FOMO causes traders to enter trades hastily without proper analysis, just because they see others profiting.",
  },

  // Strategy Development
  {
    id: "sd1",
    category: "Strategy Development",
    question: "What are entry criteria?",
    options: [
      "Specific conditions that must be met before entering a trade",
      "The broker's account opening requirements",
      "The stock exchange's trading hours",
      "The company's dividend policy",
    ],
    correctAnswer: 0,
    explanation:
      "Entry criteria are the specific conditions and signals that indicate when it's appropriate to enter a trade.",
  },
  {
    id: "sd2",
    category: "Strategy Development",
    question: "What are exit criteria?",
    options: [
      "Predetermined conditions for closing a trade (profit target or stop loss)",
      "The time to close your trading account",
      "The broker's withdrawal policy",
      "The market's closing time",
    ],
    correctAnswer: 0,
    explanation:
      "Exit criteria define when to close a trade, including profit targets and stop-loss levels to manage risk.",
  },
  {
    id: "sd3",
    category: "Strategy Development",
    question: "What is backtesting?",
    options: [
      "Testing a trading strategy on historical data before using real money",
      "A type of technical indicator",
      "A broker's verification process",
      "A market analysis tool",
    ],
    correctAnswer: 0,
    explanation:
      "Backtesting allows traders to evaluate how their strategy would have performed on historical price data.",
  },
];

export const LEARNING_STAGES = [
  {
    id: 1,
    name: "Market Fundamentals",
    description: "Understand the basics of financial markets",
  },
  {
    id: 2,
    name: "Technical Analysis",
    description: "Learn to read and interpret price charts",
  },
  {
    id: 3,
    name: "Risk Management",
    description: "Master the art of protecting your capital",
  },
  {
    id: 4,
    name: "Trading Psychology",
    description: "Develop discipline and emotional control",
  },
  {
    id: 5,
    name: "Strategy Building",
    description: "Create your own trading strategy",
  },
  {
    id: 6,
    name: "Backtesting",
    description: "Validate your strategy with historical data",
  },
  {
    id: 7,
    name: "Demo Trading",
    description: "Practice with virtual money",
  },
  {
    id: 8,
    name: "Prop Firm Preparation",
    description: "Prepare for proprietary trading firms",
  },
  {
    id: 9,
    name: "Advanced Trading",
    description: "Master advanced techniques and strategies",
  },
];

export function calculateLevel(scores: Record<string, number>): "Beginner" | "Intermediate" | "Advanced" {
  const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
  if (avgScore >= 80) return "Advanced";
  if (avgScore >= 60) return "Intermediate";
  return "Beginner";
}
