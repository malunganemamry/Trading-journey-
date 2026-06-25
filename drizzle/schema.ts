
import { pgTable, serial, text, timestamp, varchar, integer, boolean, primaryKey, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Existing users table (from Supabase Auth)
export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(), // Supabase auth user ID
  email: varchar("email", { length: 256 }).unique(),
  // Add other fields from Supabase auth.users table if needed
});

export const profiles = pgTable("profiles", {
  id: varchar("id", { length: 256 }).primaryKey().references(() => users.id, { onDelete: "cascade" }),
  username: varchar("username", { length: 256 }).unique(),
  avatar_url: text("avatar_url"),
  full_name: text("full_name"),
  level: varchar("level", { length: 50 }).default("Beginner").notNull(),
  current_stage: integer("current_stage").default(1).notNull(),
  streak_days: integer("streak_days").default(0).notNull(),
  lessons_completed: integer("lessons_completed").default(0).notNull(),
  total_trades: integer("total_trades").default(0).notNull(),
  win_rate: real("win_rate").default(0.0).notNull(),
  total_pnl: real("total_pnl").default(0.0).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const lessonCategories = pgTable("lesson_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  description: text("description"),
  order_index: integer("order_index").notNull().unique(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  category_id: integer("category_id").references(() => lessonCategories.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 256 }).notNull().unique(),
  content: text("content").notNull(),
  estimated_time: integer("estimated_time"), // in minutes
  video_url: text("video_url"),
  order_index: integer("order_index").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  user_id: varchar("user_id", { length: 256 }).references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  lesson_id: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
  completed_at: timestamp("completed_at").defaultNow().notNull(),
  score: integer("score"), // For quizzes associated with lessons
}, (table) => ({
  pk: primaryKey({ columns: [table.user_id, table.lesson_id] }),
}));

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull().unique(),
  description: text("description"),
  category: varchar("category", { length: 256 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const assessmentQuestions = pgTable("assessment_questions", {
  id: serial("id").primaryKey(),
  assessment_id: integer("assessment_id").references(() => assessments.id, { onDelete: "cascade" }).notNull(),
  question_text: text("question_text").notNull().unique(),
  options: text("options").array().notNull(), // Store as JSON array of strings
  correct_answer_index: integer("correct_answer_index").notNull(),
});

export const assessmentResults = pgTable("assessment_results", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  assessment_id: integer("assessment_id").references(() => assessments.id, { onDelete: "cascade" }).notNull(),
  score: integer("score").notNull(),
  completed_at: timestamp("completed_at").defaultNow().notNull(),
});

export const journalTrades = pgTable("journal_trades", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  date: timestamp("date").notNull(),
  market: varchar("market", { length: 256 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // e.g., 'Long', 'Short'
  entry_price: real("entry_price").notNull(),
  exit_price: real("exit_price"),
  pnl: real("pnl"),
  result: varchar("result", { length: 50 }), // e.g., 'Win', 'Loss', 'Break Even'
  reason: text("reason"),
  lesson_learned: text("lesson_learned"),
  notes: text("notes"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  description: text("description"),
  icon_url: text("icon_url"),
});

export const userAchievements = pgTable("user_achievements", {
  user_id: varchar("user_id", { length: 256 }).references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  achievement_id: integer("achievement_id").references(() => achievements.id, { onDelete: "cascade" }).notNull(),
  unlocked_at: timestamp("unlocked_at").defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.user_id, table.achievement_id] }),
}));

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).references(() => profiles.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const settings = pgTable("settings", {
  user_id: varchar("user_id", { length: 256 }).references(() => profiles.id, { onDelete: "cascade" }).primaryKey(),
  dark_mode: boolean("dark_mode").default(false).notNull(),
  notifications_enabled: boolean("notifications_enabled").default(true).notNull(),
  // Add other user settings here
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, { fields: [users.id], references: [profiles.id] }),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.id], references: [users.id] }),
  userProgress: many(userProgress),
  assessmentResults: many(assessmentResults),
  journalTrades: many(journalTrades),
  userAchievements: many(userAchievements),
  notifications: many(notifications),
  settings: one(settings, { fields: [profiles.id], references: [settings.user_id] }),
}));

export const lessonCategoriesRelations = relations(lessonCategories, ({ many }) => ({
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  category: one(lessonCategories, { fields: [lessons.category_id], references: [lessonCategories.id] }),
  userProgress: many(userProgress),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  profile: one(profiles, { fields: [userProgress.user_id], references: [profiles.id] }),
  lesson: one(lessons, { fields: [userProgress.lesson_id], references: [lessons.id] }),
}));

export const assessmentsRelations = relations(assessments, ({ many }) => ({
  questions: many(assessmentQuestions),
  results: many(assessmentResults),
}));

export const assessmentQuestionsRelations = relations(assessmentQuestions, ({ one }) => ({
  assessment: one(assessments, { fields: [assessmentQuestions.assessment_id], references: [assessments.id] }),
}));

export const assessmentResultsRelations = relations(assessmentResults, ({ one }) => ({
  profile: one(profiles, { fields: [assessmentResults.user_id], references: [profiles.id] }),
  assessment: one(assessments, { fields: [assessmentResults.assessment_id], references: [assessments.id] }),
}));

export const journalTradesRelations = relations(journalTrades, ({ one }) => ({
  profile: one(profiles, { fields: [journalTrades.user_id], references: [profiles.id] }),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  profile: one(profiles, { fields: [userAchievements.user_id], references: [profiles.id] }),
  achievement: one(achievements, { fields: [userAchievements.achievement_id], references: [achievements.id] }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  profile: one(profiles, { fields: [notifications.user_id], references: [profiles.id] }),
}));

export const settingsRelations = relations(settings, ({ one }) => ({
  profile: one(profiles, { fields: [settings.user_id], references: [profiles.id] }),
}));
