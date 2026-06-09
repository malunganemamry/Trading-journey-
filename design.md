# LogieFX Mobile App - Design Plan

## Vision
LogieFX is an AI-powered trading education platform that transforms complete beginners into disciplined, knowledgeable traders. The app acts as a mentor, coach, roadmap planner, psychologist, and progress tracker rolled into one.

## Design Principles
- **Modern Dark Mode**: Black, Dark Gray, Electric Blue, White
- **Minimalist & Professional**: Clean, uncluttered interface inspired by Duolingo, Notion, and TradingView
- **Mobile-First**: Portrait orientation (9:16), optimized for one-handed usage
- **Consistent Feedback**: Clear visual feedback for all interactions
- **Accessibility**: Large touch targets, readable typography, sufficient contrast

## Screen List

### Authentication & Onboarding
1. **Landing Screen** - Hero section with "Become the Trader You Were Meant To Be" messaging
2. **Sign Up Screen** - Email, Google, Apple authentication options
3. **Skill Assessment Screen** - Multi-category quiz (Market Basics, Technical Analysis, Risk Management, Psychology, Strategy Development)
4. **Assessment Results Screen** - Level determination (Beginner/Intermediate/Advanced) with personalized roadmap preview

### Core Navigation (Tab Bar)
- **Home** (Dashboard)
- **Learn** (Learning Modules)
- **Journal** (Trading Journal)
- **Profile** (Settings & Progress)

### Dashboard & Learning Path
5. **Dashboard Screen** - Current level, progress %, streak, recommended next lesson, weekly goals
6. **Roadmap Screen** - Visual 9-stage learning path with stage unlock progression
7. **Stage Detail Screen** - Stage overview, lessons list, unlock requirements

### Learning Content
8. **Lesson Screen** - Written explanation, video recommendations, interactive examples, quiz
9. **Book Recommendations Screen** - Curated books by level with summaries and progress tracking
10. **Video Recommendations Screen** - Recommended videos with watch/helpful/not helpful tracking

### Strategy & Analysis Tools
11. **Strategy Builder Screen** - Market selection, trading style, entry/exit/risk rules
12. **Strategy Document Screen** - Generated strategy summary and export
13. **Backtesting Center Screen** - Trade history, performance metrics (win rate, profit factor, risk-reward)
14. **Psychology Training Screen** - Interactive scenarios with correct mindset explanations

### Trading Journal
15. **Trading Journal List Screen** - All recorded trades with filters
16. **Add Trade Screen** - Date, market, entry, exit, risk, reason, screenshot, lesson learned
17. **Trade Detail Screen** - Full trade review with statistics

### AI Mentor & Progress
18. **AI Mentor Chat Screen** - Chatbot for trading questions, concept explanations, strategy reviews
19. **Progress Tracking Screen** - Knowledge, Psychology, Risk Management, Strategy, Overall Trader scores
20. **Prop Firm Prep Screen** - Daily/Max drawdown, profit target, consistency, readiness score

### Settings
21. **Profile Screen** - User info, preferences, account management
22. **Settings Screen** - Theme, notifications, data export

## Primary Content & Functionality

### Dashboard
- **Level Badge**: Current trader level (Beginner/Intermediate/Advanced)
- **Progress Ring**: Percentage of current stage completed
- **Streak Counter**: Consecutive days of learning
- **Recommended Lesson**: Next lesson to take
- **Weekly Stats**: Learning time, lessons completed
- **Quick Actions**: Start learning, view roadmap, open journal

### Learning Modules
- **Lesson Card**: Title, category, estimated time, difficulty
- **Content Sections**: 
  - Written explanation (scrollable)
  - Video recommendations (horizontal scroll)
  - Interactive example (if applicable)
  - Quiz (3-5 questions)
- **Progress Indicator**: Completion percentage per stage

### Trading Journal
- **Journal Entry Form**:
  - Date picker
  - Market selector (Forex, Stocks, Crypto)
  - Entry price input
  - Exit price input
  - Risk percentage input
  - Reason for entry (text)
  - Screenshot upload
  - Lesson learned (text)
- **Journal Statistics**:
  - Total trades
  - Win rate
  - Profit factor
  - Average risk-reward ratio
  - Monthly performance chart

### Strategy Builder
- **Step-by-Step Form**:
  - Market type (Forex, Stocks, Crypto)
  - Trading style (Scalping, Day Trading, Swing Trading)
  - Entry rules (text input)
  - Exit rules (text input)
  - Risk rules (position sizing, 1% per trade, etc.)
  - Trading session selection
- **Generated Strategy Document**: Complete strategy summary with all rules

### Psychology Training
- **Scenario Card**:
  - Situation description
  - Multiple choice options (A, B, C)
  - Correct answer with explanation
  - Discipline/Emotional Control/Consistency score updates
- **Score Dashboard**: Track three psychology metrics

### AI Mentor
- **Chat Interface**:
  - Message list with user/AI messages
  - Text input field
  - Quick action buttons (Ask about concepts, Review strategy, Recommend lessons)
- **Capabilities**: Explain concepts, recommend lessons, review strategies, suggest books, answer trading questions

## Key User Flows

### Flow 1: New User Onboarding
1. Landing Screen → "Start Learning" button
2. Sign Up Screen → Create account (Email/Google/Apple)
3. Skill Assessment Screen → Complete 20-question quiz
4. Assessment Results Screen → View level and personalized roadmap
5. Dashboard Screen → Ready to start learning

### Flow 2: Daily Learning
1. Dashboard Screen → Tap "Recommended Next Lesson"
2. Lesson Screen → Read content, watch videos, complete quiz
3. Lesson Complete → Progress updated, next lesson unlocked
4. Dashboard Screen → Updated progress visible

### Flow 3: Record Trade
1. Dashboard Screen → Tap "Journal" tab
2. Trading Journal List → Tap "Add Trade"
3. Add Trade Screen → Fill in trade details, upload screenshot
4. Trade Detail Screen → View recorded trade with auto-calculated statistics

### Flow 4: Build Strategy
1. Dashboard Screen → Tap "Learn" → Find "Strategy Builder" lesson
2. Strategy Builder Screen → Fill in market, style, rules
3. Strategy Document Screen → View generated strategy, export/share

### Flow 5: Psychology Training
1. Dashboard Screen → Tap "Learn" → Find "Psychology Training" section
2. Psychology Training Screen → Answer scenario, receive feedback
3. Score updates → Track discipline improvement

### Flow 6: AI Mentor Consultation
1. Dashboard Screen → Tap "Profile" → "AI Mentor"
2. AI Mentor Chat Screen → Ask question
3. AI responds with explanation/recommendation
4. Continue conversation or return to learning

## Color Palette

| Element | Light Mode | Dark Mode | Usage |
|---------|-----------|-----------|-------|
| Background | #FFFFFF | #0F0F0F | Screen backgrounds |
| Surface | #F5F5F5 | #1A1A1A | Cards, elevated surfaces |
| Foreground | #11181C | #ECEDEE | Primary text |
| Muted | #687076 | #9BA1A6 | Secondary text |
| Primary (Electric Blue) | #0A7EA4 | #0A7EA4 | Buttons, accents, highlights |
| Border | #E5E7EB | #334155 | Dividers, borders |
| Success | #22C55E | #4ADE80 | Positive feedback |
| Warning | #F59E0B | #FBBF24 | Warnings |
| Error | #EF4444 | #F87171 | Errors |

## Typography

- **Headings**: SF Pro Display / Roboto Bold (24-32px)
- **Body**: SF Pro Text / Roboto Regular (14-16px)
- **Small**: SF Pro Text / Roboto Regular (12-13px)
- **Monospace**: SF Mono / Roboto Mono (12-14px for code/numbers)

## Component Library

### Buttons
- **Primary Button**: Electric Blue background, white text, 48px height, rounded corners
- **Secondary Button**: Transparent with border, Electric Blue text
- **Tertiary Button**: Text-only, Electric Blue text

### Cards
- **Lesson Card**: Title, category badge, time estimate, difficulty indicator
- **Trade Card**: Date, market, entry/exit, P&L, status
- **Progress Card**: Stage name, progress bar, unlock requirements

### Input Fields
- **Text Input**: Dark background, light text, rounded corners
- **Number Input**: For prices, percentages, risk amounts
- **Dropdown**: Market, trading style, category selection
- **Date Picker**: Calendar interface

### Progress Indicators
- **Progress Ring**: Circular progress for stage completion
- **Progress Bar**: Linear progress for lesson completion
- **Streak Counter**: Badge with number and flame icon

### Badges & Tags
- **Level Badge**: Beginner/Intermediate/Advanced with color coding
- **Category Badge**: Market Basics, Technical Analysis, etc.
- **Status Badge**: Completed, In Progress, Locked

## Interaction Patterns

### Press Feedback
- **Buttons**: Scale to 0.97 + haptic feedback (Light)
- **Cards**: Opacity 0.7 on press
- **Icons**: Opacity 0.6 on press

### Loading States
- **Skeleton Screens**: For lesson content, journal entries
- **Spinner**: For API calls, quiz submissions
- **Disabled State**: Buttons disabled while loading

### Empty States
- **No Trades**: "Start recording trades to track your progress"
- **No Lessons**: "Complete current stage to unlock new lessons"
- **No Messages**: "Start a conversation with your AI mentor"

### Success Feedback
- **Lesson Completed**: Celebration animation, confetti effect
- **Quiz Passed**: Success message with score
- **Trade Recorded**: Toast notification "Trade saved"

## Accessibility
- **Touch Targets**: Minimum 44x44pt for all interactive elements
- **Color Contrast**: WCAG AA standard (4.5:1 for text)
- **Text Sizing**: Respects system font size settings
- **VoiceOver/TalkBack**: All elements properly labeled
