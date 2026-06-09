import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";

export default function LearnScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          <Text className="text-3xl font-bold text-foreground">Learning Path</Text>
          <Text className="text-base text-muted">
            Complete stages to become a disciplined trader
          </Text>

          {/* Quick Links */}
          <View className="mt-4 gap-3">
            <TouchableOpacity
              className="bg-primary rounded-xl p-4 flex-row justify-between items-center"
              onPress={() => router.push("/lesson")}
            >
              <View className="gap-1">
                <Text className="text-lg font-bold text-background">Start Lesson</Text>
                <Text className="text-sm text-background/80">What is a Stock?</Text>
              </View>
              <IconSymbol size={24} name="arrow.up.right" color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
              onPress={() => router.push("/books")}
            >
              <View className="gap-1">
                <Text className="text-lg font-semibold text-foreground">Recommended Books</Text>
                <Text className="text-sm text-muted">Curated by your level</Text>
              </View>
              <IconSymbol size={24} name="chevron.right" color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
              onPress={() => router.push("/progress")}
            >
              <View className="gap-1">
                <Text className="text-lg font-semibold text-foreground">Your Progress</Text>
                <Text className="text-sm text-muted">Track your scores</Text>
              </View>
              <IconSymbol size={24} name="chevron.right" color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
              onPress={() => router.push("/roadmap")}
            >
              <View className="gap-1">
                <Text className="text-lg font-semibold text-foreground">Learning Roadmap</Text>
                <Text className="text-sm text-muted">9 stages to mastery</Text>
              </View>
              <IconSymbol size={24} name="chevron.right" color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
