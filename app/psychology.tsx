import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

export default function PsychologyScreen() {
  const colors = useColors();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [showExplanation, setShowExplanation] = useState(false);
  const [scores, setScores] = useState({
    discipline: 65,
    emotionalControl: 58,
    consistency: 72,
  });

  const scenarios = [
    {
      id: "s1",
      situation: "You have lost four trades in a row. Your account is down 4%. What do you do?",
      options: [
        { label: "A", text: "Increase lot size to quickly recover losses" },
        { label: "B", text: "Follow your trading plan and stick to your position sizing" },
        { label: "C", text: "Enter another trade immediately to make back the money" },
      ],
      correctAnswer: 1,
      explanation:
        "The correct answer is B. Following your plan and maintaining discipline is crucial. Revenge trading (C) or increasing risk (A) often leads to bigger losses. Stick to your strategy.",
      skillsImproved: ["discipline", "emotionalControl"],
    },
    {
      id: "s2",
      situation: "You see a trade setup that looks perfect, but you've already reached your daily loss limit.",
      options: [
        { label: "A", text: "Take the trade anyway - it's too good to miss" },
        { label: "B", text: "Wait for tomorrow and stick to your risk rules" },
        { label: "C", text: "Double your position size to make up for the day" },
      ],
      correctAnswer: 1,
      explanation:
        "The correct answer is B. Discipline means following your risk rules even when opportunities seem perfect. FOMO (fear of missing out) is a trader's enemy. There will always be more trades.",
      skillsImproved: ["discipline", "consistency"],
    },
  ];

  const scenario = scenarios[currentScenario];
  const isCorrect = selectedAnswer === scenario.correctAnswer;

  const handleSubmit = () => {
    if (isCorrect) {
      setScores({
        discipline: Math.min(100, scores.discipline + 5),
        emotionalControl: Math.min(100, scores.emotionalControl + 3),
        consistency: Math.min(100, scores.consistency + 4),
      });
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(-1);
      setShowExplanation(false);
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Scores */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Your Psychology Scores</Text>
            <View className="gap-2">
              <View className="gap-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-muted">Discipline</Text>
                  <Text className="text-sm font-bold text-primary">{scores.discipline}%</Text>
                </View>
                <View className="h-2 bg-border rounded-full overflow-hidden">
                  <View className="h-full bg-primary" style={{ width: `${scores.discipline}%` }} />
                </View>
              </View>
              <View className="gap-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-muted">Emotional Control</Text>
                  <Text className="text-sm font-bold text-primary">{scores.emotionalControl}%</Text>
                </View>
                <View className="h-2 bg-border rounded-full overflow-hidden">
                  <View className="h-full bg-primary" style={{ width: `${scores.emotionalControl}%` }} />
                </View>
              </View>
              <View className="gap-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-muted">Consistency</Text>
                  <Text className="text-sm font-bold text-primary">{scores.consistency}%</Text>
                </View>
                <View className="h-2 bg-border rounded-full overflow-hidden">
                  <View className="h-full bg-primary" style={{ width: `${scores.consistency}%` }} />
                </View>
              </View>
            </View>
          </View>

          {/* Scenario */}
          <View className="gap-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-muted">Scenario {currentScenario + 1}/{scenarios.length}</Text>
              <View className="bg-primary/20 rounded-full px-2 py-1">
                <Text className="text-xs font-semibold text-primary">Psychology Training</Text>
              </View>
            </View>

            <Text className="text-2xl font-bold text-foreground">{scenario.situation}</Text>

            {/* Options */}
            <View className="gap-2">
              {scenario.options.map((option, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedAnswer(index)}
                  disabled={showExplanation}
                  style={({ pressed }) => [{ opacity: pressed && !showExplanation ? 0.7 : 1 }]}
                >
                  <View
                    className={`p-4 rounded-xl border-2 ${
                      selectedAnswer === index
                        ? "bg-primary border-primary"
                        : showExplanation && index === scenario.correctAnswer
                          ? "bg-success border-success"
                          : showExplanation && selectedAnswer === index && !isCorrect
                            ? "bg-error border-error"
                            : "bg-surface border-border"
                    }`}
                  >
                    <Text
                      className={`text-base font-semibold ${
                        selectedAnswer === index || (showExplanation && index === scenario.correctAnswer)
                          ? "text-background"
                          : "text-foreground"
                      }`}
                    >
                      {option.label}. {option.text}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            {/* Explanation */}
            {showExplanation && (
              <View className={`rounded-xl p-4 gap-2 ${isCorrect ? "bg-success/10 border border-success/30" : "bg-error/10 border border-error/30"}`}>
                <Text className={`font-semibold ${isCorrect ? "text-success" : "text-error"}`}>
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </Text>
                <Text className="text-sm text-foreground">{scenario.explanation}</Text>
              </View>
            )}
          </View>

          {/* Navigation */}
          <View className="flex-row gap-3">
            {!showExplanation ? (
              <TouchableOpacity
                className={`flex-1 rounded-xl p-3 items-center ${selectedAnswer === -1 ? "bg-border opacity-50" : "bg-primary"}`}
                onPress={handleSubmit}
                disabled={selectedAnswer === -1}
              >
                <Text className={`font-bold ${selectedAnswer === -1 ? "text-muted" : "text-background"}`}>Submit Answer</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className={`flex-1 rounded-xl p-3 items-center ${currentScenario === scenarios.length - 1 ? "bg-border opacity-50" : "bg-primary"}`}
                onPress={handleNext}
                disabled={currentScenario === scenarios.length - 1}
              >
                <Text className={`font-bold ${currentScenario === scenarios.length - 1 ? "text-muted" : "text-background"}`}>
                  {currentScenario === scenarios.length - 1 ? "Complete" : "Next Scenario"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
