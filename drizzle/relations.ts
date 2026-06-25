import { relations } from "drizzle-orm";
import { users, profiles, lessonCategories, lessons, userProgress, assessments, assessmentQuestions, assessmentResults, journalTrades, achievements, userAchievements, notifications, settings } from "./schema";

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
