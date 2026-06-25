import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { useFocusEffect } from "@react-navigation/native";

type HomeStats = {
  username: string;
  level: string;
  streak: number;
  lessonsDone: number;
  totalTrades: number;
  winRate: number;
};

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { user } = useAuth();
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [nextLesson, setNextLesson] = useState<{id: number, title: string, category: string} | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHomeData = useCallback(async () => {
    if (!user) return;
    try {
      // 1. Fetch Profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setStats({
          username: profile.username || 'Trader',
          level: profile.level || 'Beginner',
          streak: profile.streak_days || 0,
          lessonsDone: profile.lessons_completed || 0,
          totalTrades: profile.total_trades || 0,
          winRate: profile.win_rate || 0,
        });
      }

      // 2. Fetch Recommended Next Lesson
      // Simple logic: get the first lesson not completed by the user
      const { data: completed } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', user.id);
      
      const completedIds = completed?.map(p => p.lesson_id) || [];
      
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, title, lesson_categories(name)')
        .order('order_index', { ascending: true });
      
      const next = lessons?.find(l => !completedIds.includes(l.id));
      if (next) {
        setNextLesson({
          id: next.id,
          title: next.title,
          category: (next.lesson_categories as any)?.name || 'General'
        });
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchHomeData();
    }, [fetchHomeData])
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header with greeting */}
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Welcome Back, {stats?.username || 'Trader'}</Text>
            <Text className="text-base text-muted">Let's continue your trading journey</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} className="mt-10" />
          ) : (
            <>
              {/* Level & Progress Card */}
              <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
                <View className="flex-row justify-between items-start">
                  <View className="gap-1">
                    <Text className="text-sm text-muted">Current Level</Text>
                    <Text className="text-2xl font-bold text-foreground">{stats?.level}</Text>
                  </View>
                  <View className="bg-primary/20 rounded-full px-3 py-1">
                    <Text className="text-sm font-semibold text-primary">Stage 1/5</Text>
                  </View>
                </View>

                {/* Stats Row */}
                <View className="flex-row gap-3 pt-4 border-t border-border">
                  <View className="flex-1 items-center gap-1">
                    <IconSymbol size={20} name="calendar" color={colors.primary} />
                    <Text className="text-2xl font-bold text-foreground">{stats?.streak}</Text>
                    <Text className="text-xs text-muted">Day Streak</Text>
                  </View>
                  <View className="flex-1 items-center gap-1">
                    <IconSymbol size={20} name="checkmark.circle.fill" color={colors.primary} />
                    <Text className="text-2xl font-bold text-foreground">{stats?.lessonsDone}</Text>
                    <Text className="text-xs text-muted">Lessons Done</Text>
                  </View>
                  <View className="flex-1 items-center gap-1">
                    <IconSymbol size={20} name="book.fill" color={colors.primary} />
                    <Text className="text-2xl font-bold text-foreground">{stats?.totalTrades}</Text>
                    <Text className="text-xs text-muted">Total Trades</Text>
                  </View>
                </View>
              </View>

              {/* Recommended Lesson */}
              {nextLesson && (
                <View className="gap-2">
                  <Text className="text-lg font-semibold text-foreground">Recommended Next</Text>
                  <TouchableOpacity 
                    className="bg-primary rounded-xl p-4 gap-2"
                    onPress={() => router.push({ pathname: "/lesson", params: { lessonId: nextLesson.id } })}
                  >
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1 gap-1">
                        <Text className="text-lg font-bold text-background">{nextLesson.category}</Text>
                        <Text className="text-sm text-background/80">{nextLesson.title}</Text>
                      </View>
                      <IconSymbol size={24} name="play.circle.fill" color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {/* Quick Actions */}
              <View className="gap-2">
                <Text className="text-lg font-semibold text-foreground">Quick Actions</Text>
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    className="flex-1 bg-surface rounded-xl p-4 items-center gap-2 border border-border"
                    onPress={() => router.push("/(tabs)/learn")}
                  >
                    <IconSymbol size={24} name="book.fill" color={colors.primary} />
                    <Text className="text-xs font-semibold text-foreground text-center">Learning Path</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="flex-1 bg-surface rounded-xl p-4 items-center gap-2 border border-border"
                    onPress={() => router.push("/journal-list")}
                  >
                    <IconSymbol size={24} name="plus" color={colors.primary} />
                    <Text className="text-xs font-semibold text-foreground text-center">Add Trade</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="flex-1 bg-surface rounded-xl p-4 items-center gap-2 border border-border"
                    onPress={() => router.push("/mentor")}
                  >
                    <IconSymbol size={24} name="paperplane.fill" color={colors.primary} />
                    <Text className="text-xs font-semibold text-foreground text-center">Ask Mentor</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
