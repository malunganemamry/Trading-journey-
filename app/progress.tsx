import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function ProgressScreen() {
  const colors = useColors();

  const scores = {
    knowledge: 65,
    psychology: 58,
    riskManagement: 72,
    strategy: 45,
    overall: 60,
  };

  const achievements = [
    { id: "a1", name: "First Lesson", description: "Complete your first lesson", earned: true },
    { id: "a2", name: "Week Warrior", description: "7-day learning streak", earned: true },
    { id: "a3", name: "Quiz Master", description: "Pass 10 quizzes", earned: false },
    { id: "a4", name: "Strategy Builder", description: "Create your first strategy", earned: false },
    { id: "a5", name: "Journal Keeper", description: "Record 10 trades", earned: false },
    { id: "a6", name: "Trader Pro", description: "Reach Advanced level", earned: false },
  ];

  const ScoreCard = ({ label, score }: { label: string; score: number }) => (
    <View className="bg-surface rounded-xl p-4 border border-border gap-2">
      <Text className="text-sm text-muted">{label}</Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-3xl font-bold text-foreground">{score}%</Text>
        <View
          className="w-16 h-16 rounded-full items-center justify-center"
          style={{
            backgroundColor: score >= 70 ? colors.success : score >= 50 ? colors.primary : colors.warning,
            opacity: 0.2,
          }}
        >
          <Text className="text-2xl font-bold" style={{ color: score >= 70 ? colors.success : score >= 50 ? colors.primary : colors.warning }}>
            {score}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Your Progress</Text>
            <Text className="text-base text-muted">Track your trading education journey</Text>
          </View>

          {/* Overall Score */}
          <View className="bg-gradient-to-r from-primary to-primary/60 rounded-2xl p-6 gap-3">
            <Text className="text-sm text-background/80">Overall Trader Score</Text>
            <Text className="text-5xl font-bold text-background">{scores.overall}</Text>
            <View className="h-2 bg-background/30 rounded-full overflow-hidden">
              <View className="h-full w-3/5 bg-background" />
            </View>
            <Text className="text-sm text-background/80">Keep learning to improve your score</Text>
          </View>

          {/* Category Scores */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Category Scores</Text>
            <ScoreCard label="Knowledge" score={scores.knowledge} />
            <ScoreCard label="Psychology" score={scores.psychology} />
            <ScoreCard label="Risk Management" score={scores.riskManagement} />
            <ScoreCard label="Strategy" score={scores.strategy} />
          </View>

          {/* Achievements */}
          <View className="gap-3">
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
            </View>
          </View>

          {/* Stats */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Statistics</Text>
            <View className="flex-row gap-2">
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border items-center gap-1">
                <Text className="text-2xl font-bold text-primary">18</Text>
                <Text className="text-xs text-muted text-center">Lessons Completed</Text>
              </View>
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border items-center gap-1">
                <Text className="text-2xl font-bold text-primary">12</Text>
                <Text className="text-xs text-muted text-center">Day Streak</Text>
              </View>
            </View>
            <View className="flex-row gap-2">
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border items-center gap-1">
                <Text className="text-2xl font-bold text-primary">8</Text>
                <Text className="text-xs text-muted text-center">Quizzes Passed</Text>
              </View>
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border items-center gap-1">
                <Text className="text-2xl font-bold text-primary">24.5h</Text>
                <Text className="text-xs text-muted text-center">Learning Time</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
