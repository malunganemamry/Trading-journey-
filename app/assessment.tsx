import { ScrollView, Text, View, TouchableOpacity, Pressable, ActivityIndicator, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";

type Question = {
  id: number;
  question_text: string;
  options: string[];
  correct_answer_index: number;
};

export default function AssessmentScreen() {
  const colors = useColors();
  const router = useRouter();
  const { user } = useAuth();
  const { assessmentId } = useLocalSearchParams();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, [assessmentId]);

  async function fetchQuestions() {
    try {
      const { data, error } = await supabase
        .from('assessment_questions')
        .select('*')
        .eq('assessment_id', assessmentId || 1) // Default to 1 if not provided
        .order('id', { ascending: true });

      if (error) throw error;
      setQuestions(data || []);
      setAnswers(new Array(data?.length || 0).fill(-1));
    } catch (error) {
      console.error('Error fetching questions:', error);
      Alert.alert('Error', 'Failed to load assessment questions.');
    } finally {
      setLoading(false);
    }
  }

  async function handleComplete() {
    if (!user) return;
    
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct_answer_index) correctCount++;
    });
    
    const finalScore = (correctCount / questions.length) * 100;
    setScore(finalScore);

    try {
      const { error } = await supabase
        .from('assessment_results')
        .insert({
          user_id: user.id,
          assessment_id: assessmentId || 1,
          score: Math.round(finalScore),
          completed_at: new Date().toISOString()
        });

      if (error) throw error;
      setIsCompleted(true);
    } catch (error) {
      console.error('Error saving result:', error);
      Alert.alert('Error', 'Failed to save your score.');
    }
  }

  if (loading) {
    return (
      <ScreenContainer className="justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (questions.length === 0) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <Text className="text-xl font-bold text-foreground text-center mb-4">No Questions Found</Text>
        <Text className="text-muted text-center mb-10">This assessment doesn't have any questions yet.</Text>
        <TouchableOpacity
          className="w-full bg-primary rounded-xl p-4 items-center"
          onPress={() => router.back()}
        >
          <Text className="text-background font-bold">Go Back</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  if (isCompleted) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <View className="w-24 h-24 bg-primary/20 rounded-full items-center justify-center mb-6">
          <Text className="text-4xl">🏆</Text>
        </View>
        <Text className="text-3xl font-bold text-foreground text-center">Assessment Complete!</Text>
        <Text className="text-5xl font-bold text-primary my-6">{Math.round(score)}%</Text>
        <Text className="text-muted text-center mb-10">
          Great job! Your results have been saved to your profile.
        </Text>
        <TouchableOpacity
          className="w-full bg-primary rounded-xl p-4 items-center"
          onPress={() => router.replace("/(tabs)")}
        >
          <Text className="text-background font-bold text-lg">Continue Learning</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted">Question {currentIndex + 1}/{questions.length}</Text>
            <View className="h-2 bg-border rounded-full overflow-hidden">
              <View className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </View>
          </View>

          <Text className="text-2xl font-bold text-foreground">{question.question_text}</Text>

          <View className="gap-3">
            {question.options.map((option, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  const newAnswers = [...answers];
                  newAnswers[currentIndex] = index;
                  setAnswers(newAnswers);
                }}
              >
                <View className={`p-4 rounded-xl border-2 ${answers[currentIndex] === index ? "bg-primary border-primary" : "bg-surface border-border"}`}>
                  <Text className={`text-base font-semibold ${answers[currentIndex] === index ? "text-background" : "text-foreground"}`}>
                    {option}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          <View className="flex-row gap-3 mt-10">
            <TouchableOpacity
              className={`flex-1 rounded-xl p-4 items-center border border-border ${currentIndex === 0 ? "opacity-50" : ""}`}
              onPress={() => setCurrentIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
            >
              <Text className="text-foreground font-semibold">Previous</Text>
            </TouchableOpacity>

            {currentIndex === questions.length - 1 ? (
              <TouchableOpacity
                className={`flex-1 rounded-xl p-4 items-center ${answers[currentIndex] === -1 ? "bg-border opacity-50" : "bg-primary"}`}
                onPress={handleComplete}
                disabled={answers[currentIndex] === -1}
              >
                <Text className="text-background font-bold">Finish</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className={`flex-1 rounded-xl p-4 items-center ${answers[currentIndex] === -1 ? "bg-border opacity-50" : "bg-primary"}`}
                onPress={() => setCurrentIndex(currentIndex + 1)}
                disabled={answers[currentIndex] === -1}
              >
                <Text className="text-background font-bold">Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
