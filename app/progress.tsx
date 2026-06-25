import { ScrollView, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";

type Achievement = {
  id: number;
  name: string;
  description: string;
  earned: boolean;
};

export default function ProgressScreen() {
  const colors = useColors();
  const router = useRouter();
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    streak: 0,
    quizzesPassed: 0,
    overallScore: 0
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, [user]);

  async function fetchProgress() {
    if (!user) return;
    try {
      // 1. Fetch Profile Stats
      const { data: profile } = await supabase
        .from('profiles')
        .select('lessons_completed, streak_days')
        .eq('id', user.id)
        .single();

      // 2. Fetch Quiz Stats
      const { data: results } = await supabase
        .from('assessment_results')
        .select('score')
        .eq('user_id', user.id);
      
      const passedCount = results?.filter(r => r.score >= 70).length || 0;
      const avgScore = results && results.length > 0 
        ? results.reduce((sum, r) => sum + r.score, 0) / results.length 
        : 0;

      setStats({
        lessonsCompleted: profile?.lessons_completed || 0,
        streak: profile?.streak_days || 0,
        quizzesPassed: passedCount,
        overallScore: Math.round(avgScore)
      });

      // 3. Fetch Achievements
      const { data: allAchievements } = await supabase.from('achievements').select('*');
      const { data: userAchievements } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', user.id);
      
      const earnedIds = userAchievements?.map(ua => ua.achievement_id) || [];
      
      setAchievements(allAchievements?.map(a => ({
        id: a.id,
        name: a.name,
        description: a.description,
        earned: earnedIds.includes(a.id)
      })) || []);

    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-foreground">Your Progress</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} className="mt-10" />
          ) : (
            <>
              {/* Overall Score */}
              <View className="bg-primary rounded-2xl p-6 gap-3">
                <Text className="text-sm text-background/80">Average Quiz Score</Text>
                <Text className="text-5xl font-bold text-background">{stats.overallScore}%</Text>
                <View className="h-2 bg-background/30 rounded-full overflow-hidden">
                  <View className="h-full bg-background" style={{ width: `${stats.overallScore}%` }} />
                </View>
                <Text className="text-sm text-background/80">
                  {stats.overallScore >= 70 ? "Excellent progress!" : "Keep practicing to improve."}
                </Text>
              </View>

              {/* Stats Grid */}
              <View className="gap-2">
                <Text className="text-lg font-semibold text-foreground">Statistics</Text>
                <View className="flex-row gap-2">
                  <View className="flex-1 bg-surface rounded-xl p-4 border border-border items-center gap-1">
                    <Text className="text-2xl font-bold text-primary">{stats.lessonsCompleted}</Text>
                    <Text className="text-xs text-muted text-center">Lessons Completed</Text>
                  </View>
                  <View className="flex-1 bg-surface rounded-xl p-4 border border-border items-center gap-1">
                    <Text className="text-2xl font-bold text-primary">{stats.streak}</Text>
                    <Text className="text-xs text-muted text-center">Day Streak</Text>
                  </View>
                </View>
                <View className="flex-row gap-2">
                  <View className="flex-1 bg-surface rounded-xl p-4 border border-border items-center gap-1">
                    <Text className="text-2xl font-bold text-primary">{stats.quizzesPassed}</Text>
                    <Text className="text-xs text-muted text-center">Quizzes Passed</Text>
                  </View>
                  <View className="flex-1 bg-surface rounded-xl p-4 border border-border items-center gap-1">
                    <Text className="text-2xl font-bold text-primary">{stats.overallScore}%</Text>
                    <Text className="text-xs text-muted text-center">Avg. Score</Text>
                  </View>
                </View>
              </View>

              {/* Achievements */}
              <View className="gap-3 mb-10">
                <Text className="text-lg font-semibold text-foreground">Achievements</Text>
                <View className="gap-2">
                  {achievements.map((achievement) => (
                    <View
                      key={achievement.id}
                      className={`rounded-xl p-4 border flex-row items-center gap-3 ${
                        achievement.earned
                          ? "bg-success/10 border-success/30"
                          : "bg-surface border-border opacity-50"
                      }`}
                    >
                      <View
                        className={`w-12 h-12 rounded-full items-center justify-center ${
                          achievement.earned ? "bg-success/20" : "bg-border"
                        }`}
                      >
                        <Text className="text-xl">
                          {achievement.earned ? "🏆" : "🔒"}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-foreground">{achievement.name}</Text>
                        <Text className="text-sm text-muted">{achievement.description}</Text>
                      </View>
                    </View>
                  ))}
                  {achievements.length === 0 && (
                    <Text className="text-center text-muted mt-4">No achievements available yet.</Text>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
