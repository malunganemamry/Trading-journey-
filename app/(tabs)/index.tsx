import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header with greeting */}
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Welcome Back</Text>
            <Text className="text-base text-muted">Let's continue your trading journey</Text>
          </View>

          {/* Level & Progress Card */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-4">
            <View className="flex-row justify-between items-start">
              <View className="gap-1">
                <Text className="text-sm text-muted">Current Level</Text>
                <Text className="text-2xl font-bold text-foreground">Beginner</Text>
              </View>
              <View className="bg-primary/20 rounded-full px-3 py-1">
                <Text className="text-sm font-semibold text-primary">Stage 1/9</Text>
              </View>
            </View>

            {/* Progress Ring */}
            <View className="items-center gap-2">
              <View className="w-24 h-24 rounded-full bg-border items-center justify-center">
                <View className="items-center">
                  <Text className="text-3xl font-bold text-primary">18%</Text>
                  <Text className="text-xs text-muted">Complete</Text>
                </View>
              </View>
            </View>

            {/* Stats Row */}
            <View className="flex-row gap-3">
              <View className="flex-1 items-center gap-1">
                <IconSymbol size={20} name="calendar" color={colors.primary} />
                <Text className="text-2xl font-bold text-foreground">12</Text>
                <Text className="text-xs text-muted">Day Streak</Text>
              </View>
              <View className="flex-1 items-center gap-1">
                <IconSymbol size={20} name="checkmark.circle.fill" color={colors.primary} />
                <Text className="text-2xl font-bold text-foreground">8</Text>
                <Text className="text-xs text-muted">Lessons Done</Text>
              </View>
              <View className="flex-1 items-center gap-1">
                <IconSymbol size={20} name="clock.fill" color={colors.primary} />
                <Text className="text-2xl font-bold text-foreground">4.5h</Text>
                <Text className="text-xs text-muted">This Week</Text>
              </View>
            </View>
          </View>

          {/* Recommended Lesson */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Recommended Next</Text>
            <TouchableOpacity className="bg-primary rounded-xl p-4 gap-2">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 gap-1">
                  <Text className="text-lg font-bold text-background">Market Fundamentals</Text>
                  <Text className="text-sm text-background/80">What is a stock?</Text>
                </View>
                <IconSymbol size={24} name="arrow.up.right" color="white" />
              </View>
              <View className="flex-row items-center gap-2">
                <View className="flex-1 h-1 bg-background/30 rounded-full overflow-hidden">
                  <View className="h-full w-1/3 bg-background" />
                </View>
                <Text className="text-xs text-background/80">33%</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Quick Actions</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                className="flex-1 bg-surface rounded-xl p-4 items-center gap-2 border border-border"
                onPress={() => router.push("/roadmap")}
              >
                <IconSymbol size={24} name="book.fill" color={colors.primary} />
                <Text className="text-xs font-semibold text-foreground text-center">View Roadmap</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-surface rounded-xl p-4 items-center gap-2 border border-border">
                <IconSymbol size={24} name="pencil" color={colors.primary} />
                <Text className="text-xs font-semibold text-foreground text-center">Add Trade</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-surface rounded-xl p-4 items-center gap-2 border border-border">
                <IconSymbol size={24} name="paperplane.fill" color={colors.primary} />
                <Text className="text-xs font-semibold text-foreground text-center">Ask Mentor</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Weekly Goals */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Weekly Goals</Text>
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-foreground">Complete 3 lessons</Text>
                <Text className="text-sm text-primary font-semibold">2/3</Text>
              </View>
              <View className="h-2 bg-border rounded-full overflow-hidden">
                <View className="h-full w-2/3 bg-primary" />
              </View>

              <View className="flex-row justify-between items-center pt-3 border-t border-border">
                <Text className="text-foreground">Record 5 trades</Text>
                <Text className="text-sm text-primary font-semibold">1/5</Text>
              </View>
              <View className="h-2 bg-border rounded-full overflow-hidden">
                <View className="h-full w-1/5 bg-primary" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
