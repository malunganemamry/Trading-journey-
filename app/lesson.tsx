import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
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
  content: string;
  video_url: string;
  estimated_time: number;
};

export default function LessonScreen() {
  const colors = useColors();
  const router = useRouter();
  const { lessonId } = useLocalSearchParams();
  const { user } = useAuth();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (lessonId) fetchLesson();
  }, [lessonId]);

  async function fetchLesson() {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();

      if (error) throw error;
      setLesson(data);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      Alert.alert('Error', 'Failed to load lesson content.');
    } finally {
      setLoading(false);
    }
  }

  async function completeLesson() {
    if (!user || !lesson) return;
    setCompleting(true);
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lesson.id,
          completed_at: new Date().toISOString()
        });

      if (error) throw error;
      
      // Update profile lesson count
      const { data: profile } = await supabase
        .from('profiles')
        .select('lessons_completed')
        .eq('id', user.id)
        .single();
      
      await supabase
        .from('profiles')
        .update({ lessons_completed: (profile?.lessons_completed || 0) + 1 })
        .eq('id', user.id);

      Alert.alert('Success', 'Lesson completed!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error completing lesson:', error);
      Alert.alert('Error', 'Failed to save progress.');
    } finally {
      setCompleting(false);
    }
  }

  if (loading) {
    return (
      <ScreenContainer className="justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (!lesson) {
    return (
      <ScreenContainer className="p-4 items-center justify-center">
        <Text className="text-foreground">Lesson not found.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-primary font-bold">Go Back</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-1">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="flex-row items-center gap-2">
                <IconSymbol size={24} name="chevron.left" color={colors.primary} />
                <Text className="text-sm text-primary font-semibold">Back</Text>
              </View>
            </TouchableOpacity>
            <View className="flex-row items-center gap-2 mt-2">
              <View className="bg-primary/20 rounded-full px-3 py-1">
                <Text className="text-xs font-semibold text-primary">Lesson</Text>
              </View>
              <Text className="text-xs text-muted">{lesson.estimated_time} min</Text>
            </View>
            <Text className="text-3xl font-bold text-foreground mt-2">{lesson.title}</Text>
          </View>

          {/* Content */}
          <View className="bg-surface rounded-xl p-4 border border-border gap-3">
            <Text className="text-base leading-relaxed text-foreground">{lesson.content}</Text>
          </View>

          {/* Video Section */}
          {lesson.video_url && (
            <View className="gap-3">
              <Text className="text-lg font-semibold text-foreground">Video Content</Text>
              <TouchableOpacity
                className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
                onPress={() => WebBrowser.openBrowserAsync(lesson.video_url)}
              >
                <View className="flex-1 gap-1">
                  <Text className="text-base font-semibold text-foreground">Watch Tutorial</Text>
                  <Text className="text-sm text-muted">Learn visually from YouTube</Text>
                </View>
                <IconSymbol size={24} name="play.circle.fill" color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}

          {/* Complete Button */}
          <TouchableOpacity
            className="bg-primary rounded-xl p-4 items-center mb-10"
            onPress={completeLesson}
            disabled={completing}
          >
            {completing ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-background font-bold text-lg">Mark as Completed</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
