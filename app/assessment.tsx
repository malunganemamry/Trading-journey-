import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAssessment } from "@/lib/assessment-context";
import { ASSESSMENT_QUESTIONS } from "@/lib/assessment-data";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";

export default function AssessmentScreen() {
  const colors = useColors();
  const router = useRouter();
  const { currentQuestionIndex, answers, selectAnswer, nextQuestion, previousQuestion, completeAssessment, isCompleted, result } = useAssessment();

  if (isCompleted && result) {
    return (
      <ScreenContainer className="p-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="gap-6 items-center justify-center py-12">
            <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
              <Text className="text-4xl">🎓</Text>
            </View>
            <Text className="text-3xl font-bold text-foreground text-center">Assessment Complete!</Text>
            <Text className="text-lg text-muted text-center">Your Level: {result.level}</Text>
            <Text className="text-4xl font-bold text-primary">{Math.round(result.totalScore)}%</Text>

            <View className="w-full gap-3 mt-4">
              <View className="bg-surface rounded-xl p-4 border border-border">
                <Text className="text-sm text-muted">Market Basics</Text>
                <Text className="text-2xl font-bold text-foreground mt-1">{Math.round(result.scores["Market Basics"])}%</Text>
              </View>
              <View className="bg-surface rounded-xl p-4 border border-border">
                <Text className="text-sm text-muted">Technical Analysis</Text>
                <Text className="text-2xl font-bold text-foreground mt-1">{Math.round(result.scores["Technical Analysis"])}%</Text>
              </View>
              <View className="bg-surface rounded-xl p-4 border border-border">
                <Text className="text-sm text-muted">Risk Management</Text>
                <Text className="text-2xl font-bold text-foreground mt-1">{Math.round(result.scores["Risk Management"])}%</Text>
              </View>
              <View className="bg-surface rounded-xl p-4 border border-border">
                <Text className="text-sm text-muted">Psychology</Text>
                <Text className="text-2xl font-bold text-foreground mt-1">{Math.round(result.scores["Psychology"])}%</Text>
              </View>
              <View className="bg-surface rounded-xl p-4 border border-border">
                <Text className="text-sm text-muted">Strategy Development</Text>
                <Text className="text-2xl font-bold text-foreground mt-1">{Math.round(result.scores["Strategy Development"])}%</Text>
              </View>
            </View>

            <TouchableOpacity
              className="w-full bg-primary rounded-xl p-4 items-center mt-6"
              onPress={() => router.replace("/(tabs)")}
            >
              <Text className="text-background font-bold text-lg">Start Learning</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  const question = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Progress */}
          <View className="gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-muted">Question {currentQuestionIndex + 1}/{ASSESSMENT_QUESTIONS.length}</Text>
              <Text className="text-sm font-semibold text-primary">{Math.round(progress)}%</Text>
            </View>
            <View className="h-2 bg-border rounded-full overflow-hidden">
              <View className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </View>
          </View>

          {/* Category Badge */}
          <View className="flex-row gap-2">
            <View className="bg-primary/20 rounded-full px-3 py-1">
              <Text className="text-xs font-semibold text-primary">{question.category}</Text>
            </View>
          </View>

          {/* Question */}
          <View className="gap-4">
            <Text className="text-2xl font-bold text-foreground">{question.question}</Text>

            {/* Options */}
            <View className="gap-3">
              {question.options.map((option, index) => (
                <Pressable
                  key={index}
                  onPress={() => selectAnswer(index)}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <View
                    className={`p-4 rounded-xl border-2 ${
                      selectedAnswer === index
                        ? "bg-primary border-primary"
                        : "bg-surface border-border"
                    }`}
                  >
                    <Text
                      className={`text-base font-semibold ${
                        selectedAnswer === index ? "text-background" : "text-foreground"
                      }`}
                    >
                      {option}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Navigation */}
          <View className="flex-row gap-3 mt-6">
            <TouchableOpacity
              className={`flex-1 rounded-xl p-3 items-center border border-border ${
                currentQuestionIndex === 0 ? "opacity-50" : ""
              }`}
              onPress={previousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <Text className="text-foreground font-semibold">Previous</Text>
            </TouchableOpacity>

            {currentQuestionIndex === ASSESSMENT_QUESTIONS.length - 1 ? (
              <TouchableOpacity
                className="flex-1 bg-primary rounded-xl p-3 items-center"
                onPress={completeAssessment}
              >
                <Text className="text-background font-bold">Complete</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className={`flex-1 rounded-xl p-3 items-center ${
                  selectedAnswer === -1 ? "opacity-50 bg-border" : "bg-primary"
                }`}
                onPress={nextQuestion}
                disabled={selectedAnswer === -1}
              >
                <Text className={`font-bold ${selectedAnswer === -1 ? "text-muted" : "text-background"}`}>
                  Next
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
