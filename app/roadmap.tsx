import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";

type Lesson = {
  id: number;
  title: string;
  order_index: number;
  content: string;
};

export default function RoadmapScreen() {
  const colors = useColors();
  const router = useRouter();
  const { categoryId, categoryName } = useLocalSearchParams();
  const { user } = useAuth();
  
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      fetchLessons();
      fetchUserProgress();
    }
  }, [categoryId]);

  async function fetchLessons() {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('id, title, order_index, content')
        .eq('category_id', categoryId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setLessons(data || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserProgress() {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setCompletedLessons(data?.map(p => p.lesson_id) || []);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="gap-1">
            <TouchableOpacity onPress={() => router.back()} className="mb-2">
              <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-foreground">{categoryName || 'Learning Roadmap'}</Text>
            <Text className="text-base text-muted">Complete all lessons to master this category</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} className="mt-10" />
          ) : (
            <View className="gap-3">
              {lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id);
                // Simple logic: first lesson is always unlocked, others if previous is completed
                const isUnlocked = index === 0 || completedLessons.includes(lessons[index-1].id);

                return (
                  <View key={lesson.id} className="gap-2">
                    <TouchableOpacity
                      disabled={!isUnlocked}
                      onPress={() => router.push({
                        pathname: "/lesson",
                        params: { lessonId: lesson.id }
                      })}
                      className={`rounded-xl p-4 border ${
                        isCompleted
                          ? "bg-primary/10 border-primary"
                          : isUnlocked
                            ? "bg-surface border-border"
                            : "bg-surface/50 border-border opacity-50"
                      }`}
                    >
                      <View className="flex-row justify-between items-start gap-3">
                        <View className="flex-1 gap-1">
                          <View className="flex-row items-center gap-2">
                            <Text className="text-lg font-bold text-foreground">Lesson {lesson.order_index}</Text>
                            {isCompleted && (
                              <IconSymbol size={20} name="checkmark.circle.fill" color={colors.primary} />
                            )}
                            {!isUnlocked && (
                              <IconSymbol size={20} name="lock.fill" color={colors.muted} />
                            )}
                          </View>
                          <Text className="text-base font-semibold text-foreground">{lesson.title}</Text>
                        </View>
                        {isUnlocked && (
                          <IconSymbol size={24} name="chevron.right" color={colors.primary} />
                        )}
                      </View>
                    </TouchableOpacity>

                    {index < lessons.length - 1 && (
                      <View className="h-4 items-center">
                        <View className="w-1 h-full bg-border" />
                      </View>
                    )}
                  </View>
                );
              })}
              
              {lessons.length === 0 && (
                <View className="items-center mt-10">
                  <Text className="text-muted">No lessons found in this category yet.</Text>
                </View>
              )}
            </View>
          )}

          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 gap-2">
            <Text className="text-sm font-semibold text-primary">💡 Learning Tip</Text>
            <Text className="text-sm text-foreground">
              Take your time with each lesson. Practical application is key to trading success.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
