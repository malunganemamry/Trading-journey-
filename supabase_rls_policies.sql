-- Enable Row Level Security (RLS) for all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policies for 'profiles' table
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK ((auth.uid() = id));
CREATE POLICY "Users can update their own profile." ON profiles FOR UPDATE USING ((auth.uid() = id));
CREATE POLICY "Users can delete their own profile." ON profiles FOR DELETE USING ((auth.uid() = id));

-- Policies for 'lesson_categories' table
CREATE POLICY "Lesson categories are viewable by everyone." ON lesson_categories FOR SELECT USING (true);

-- Policies for 'lessons' table
CREATE POLICY "Lessons are viewable by everyone." ON lessons FOR SELECT USING (true);

-- Policies for 'user_progress' table
CREATE POLICY "Users can view their own progress." ON user_progress FOR SELECT USING ((auth.uid() = user_id));
CREATE POLICY "Users can insert their own progress." ON user_progress FOR INSERT WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can update their own progress." ON user_progress FOR UPDATE USING ((auth.uid() = user_id));

-- Policies for 'assessments' table
CREATE POLICY "Assessments are viewable by everyone." ON assessments FOR SELECT USING (true);

-- Policies for 'assessment_questions' table
CREATE POLICY "Assessment questions are viewable by everyone." ON assessment_questions FOR SELECT USING (true);

-- Policies for 'assessment_results' table
CREATE POLICY "Users can view their own assessment results." ON assessment_results FOR SELECT USING ((auth.uid() = user_id));
CREATE POLICY "Users can insert their own assessment results." ON assessment_results FOR INSERT WITH CHECK ((auth.uid() = user_id));

-- Policies for 'journal_trades' table
CREATE POLICY "Users can view their own journal trades." ON journal_trades FOR SELECT USING ((auth.uid() = user_id));
CREATE POLICY "Users can insert their own journal trades." ON journal_trades FOR INSERT WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can update their own journal trades." ON journal_trades FOR UPDATE USING ((auth.uid() = user_id));
CREATE POLICY "Users can delete their own journal trades." ON journal_trades FOR DELETE USING ((auth.uid() = user_id));

-- Policies for 'achievements' table
CREATE POLICY "Achievements are viewable by everyone." ON achievements FOR SELECT USING (true);

-- Policies for 'user_achievements' table
CREATE POLICY "Users can view their own achievements." ON user_achievements FOR SELECT USING ((auth.uid() = user_id));
CREATE POLICY "Users can insert their own achievements." ON user_achievements FOR INSERT WITH CHECK ((auth.uid() = user_id));

-- Policies for 'notifications' table
CREATE POLICY "Users can view their own notifications." ON notifications FOR SELECT USING ((auth.uid() = user_id));
CREATE POLICY "Users can insert their own notifications." ON notifications FOR INSERT WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can update their own notifications." ON notifications FOR UPDATE USING ((auth.uid() = user_id));

-- Policies for 'settings' table
CREATE POLICY "Users can view their own settings." ON settings FOR SELECT USING ((auth.uid() = user_id));
CREATE POLICY "Users can insert their own settings." ON settings FOR INSERT WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can update their own settings." ON settings FOR UPDATE USING ((auth.uid() = user_id));
