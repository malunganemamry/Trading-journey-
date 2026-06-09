import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function LessonScreen() {
  const colors = useColors();
  const router = useRouter();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([-1, -1, -1]);

  const lesson = {
    id: "mb1",
    title: "What is a Stock?",
    category: "Market Basics",
    content: `A stock represents a share of ownership in a company. When you buy stock, you become a partial owner of that company. 

Stocks are traded on exchanges like the NYSE or NASDAQ. Companies issue stocks to raise capital for growth and operations.

Key benefits of stock ownership:
• Capital appreciation - potential for price growth
• Dividends - regular payments from company profits
• Voting rights - influence in company decisions
• Liquidity - easy to buy and sell

Understanding stocks is the foundation of trading education.`,
    estimatedTime: 15,
    videoRecommendations: [
      { id: "v1", title: "Stock Basics Explained", duration: 8, level: "Beginner" },
      { id: "v2", title: "How to Read Stock Charts", duration: 12, level: "Beginner" },
    ],
    quiz: [
      {
        id: "q1",
        question: "What does owning a stock mean?",
        options: ["Ownership in a company", "A loan to a company", "A bond issued by the company", "Currency exchange"],
        correctAnswer: 0,
      },
      {
        id: "q2",
        question: "Where are stocks traded?",
        options: ["Banks", "Stock exchanges", "Real estate offices", "Government offices"],
        correctAnswer: 1,
      },
      {
        id: "q3",
        question: "What is a dividend?",
        options: ["A fee for trading", "A regular payment from company profits", "A stock price increase", "A trading strategy"],
        correctAnswer: 1,
      },
    ],
  };

  const allAnswered = quizAnswers.every((a) => a !== -1);
  const correctAnswers = quizAnswers.filter((a, i) => a === lesson.quiz[i].correctAnswer).length;
  const score = (correctAnswers / lesson.quiz.length) * 100;
  const passed = score >= 70;

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-1">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="flex-row items-center gap-2">
                <IconSymbol size={24} name="chevron.left.forwardslash.chevron.right" color={colors.primary} />
                <Text className="text-sm text-primary font-semibold">Back</Text>
              </View>
            </TouchableOpacity>
            <View className="flex-row items-center gap-2 mt-2">
              <View className="bg-primary/20 rounded-full px-3 py-1">
                <Text className="text-xs font-semibold text-primary">{lesson.category}</Text>
              </View>
              <Text className="text-xs text-muted">{lesson.estimatedTime} min</Text>
            </View>
            <Text className="text-3xl font-bold text-foreground mt-2">{lesson.title}</Text>
          </View>

          {!showQuiz ? (
            <>
              {/* Content */}
              <View className="bg-surface rounded-xl p-4 border border-border gap-3">
                <Text className="text-base leading-relaxed text-foreground">{lesson.content}</Text>
              </View>

              {/* Videos */}
              <View className="gap-3">
                <Text className="text-lg font-semibold text-foreground">Recommended Videos</Text>
                {lesson.videoRecommendations.map((video) => (
                  <TouchableOpacity
                    key={video.id}
                    className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
                  >
                    <View className="flex-1 gap-1">
                      <Text className="text-base font-semibold text-foreground">{video.title}</Text>
                      <Text className="text-sm text-muted">{video.duration} minutes • {video.level}</Text>
                    </View>
                    <IconSymbol size={24} name="arrow.up.right" color={colors.primary} />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Start Quiz Button */}
              <TouchableOpacity
                className="bg-primary rounded-xl p-4 items-center"
                onPress={() => setShowQuiz(true)}
              >
                <Text className="text-background font-bold text-lg">Take Quiz</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Quiz */}
              <View className="gap-4">
                <Text className="text-2xl font-bold text-foreground">Lesson Quiz</Text>
                {lesson.quiz.map((question, index) => (
                  <View key={question.id} className="gap-2">
                    <Text className="text-base font-semibold text-foreground">{index + 1}. {question.question}</Text>
                    <View className="gap-2">
                      {question.options.map((option, optionIndex) => (
                        <Pressable
                          key={optionIndex}
                          onPress={() => {
                            const newAnswers = [...quizAnswers];
                            newAnswers[index] = optionIndex;
                            setQuizAnswers(newAnswers);
                          }}
                          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                        >
                          <View
                            className={`p-3 rounded-lg border-2 ${
                              quizAnswers[index] === optionIndex
                                ? "bg-primary border-primary"
                                : "bg-surface border-border"
                            }`}
                          >
                            <Text
                              className={`text-sm font-semibold ${
                                quizAnswers[index] === optionIndex ? "text-background" : "text-foreground"
                              }`}
                            >
                              {option}
                            </Text>
                          </View>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                ))}
              </View>

              {/* Submit Button */}
              {allAnswered && (
                <TouchableOpacity
                  className={`rounded-xl p-4 items-center ${passed ? "bg-success" : "bg-primary"}`}
                  onPress={() => {
                    // Show results
                    alert(`Quiz Complete!\n\nScore: ${Math.round(score)}%\n${passed ? "✓ Passed!" : "Try again"}`);
                    setShowQuiz(false);
                  }}
                >
                  <Text className="text-background font-bold text-lg">Submit Quiz</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
