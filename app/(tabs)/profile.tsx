import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Profile Header */}
          <View className="items-center gap-3">
            <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
              <IconSymbol size={40} name="person.fill" color={colors.background} />
            </View>
            <Text className="text-2xl font-bold text-foreground">Alex Trader</Text>
            <Text className="text-sm text-muted">Advanced Trader • Level 4</Text>
          </View>

          {/* Stats Cards */}
          <View className="gap-3">
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
              <Text className="text-sm text-muted">Overall Score</Text>
              <Text className="text-4xl font-bold text-primary mt-1">72</Text>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                <Text className="text-xs text-muted">Knowledge</Text>
                <Text className="text-2xl font-bold text-foreground mt-1">65%</Text>
              </View>
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                <Text className="text-xs text-muted">Psychology</Text>
                <Text className="text-2xl font-bold text-foreground mt-1">58%</Text>
              </View>
            </View>
          </View>

          {/* Quick Access */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Quick Access</Text>
            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
              onPress={() => router.push("/progress")}
            >
              <View className="flex-row items-center gap-3">
                <IconSymbol size={24} name="chart.line.uptrend.xyaxis" color={colors.primary} />
                <Text className="text-foreground font-semibold">Your Progress</Text>
              </View>
              <IconSymbol size={20} name="chevron.right" color={colors.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
              onPress={() => router.push("/strategy-builder")}
            >
              <View className="flex-row items-center gap-3">
                <IconSymbol size={24} name="pencil" color={colors.primary} />
                <Text className="text-foreground font-semibold">Strategy Builder</Text>
              </View>
              <IconSymbol size={20} name="chevron.right" color={colors.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
              onPress={() => router.push("/psychology")}
            >
              <View className="flex-row items-center gap-3">
                <IconSymbol size={24} name="brain" color={colors.primary} />
                <Text className="text-foreground font-semibold">Psychology Training</Text>
              </View>
              <IconSymbol size={20} name="chevron.right" color={colors.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
              onPress={() => router.push("/mentor")}
            >
              <View className="flex-row items-center gap-3">
                <IconSymbol size={24} name="paperplane.fill" color={colors.primary} />
                <Text className="text-foreground font-semibold">AI Mentor</Text>
              </View>
              <IconSymbol size={20} name="chevron.right" color={colors.muted} />
            </TouchableOpacity>
          </View>

          {/* Settings */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Settings</Text>
            <TouchableOpacity className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <IconSymbol size={24} name="gear" color={colors.muted} />
                <Text className="text-foreground font-semibold">App Settings</Text>
              </View>
              <IconSymbol size={20} name="chevron.right" color={colors.muted} />
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <IconSymbol size={24} name="questionmark.circle" color={colors.muted} />
                <Text className="text-foreground font-semibold">Help & Support</Text>
              </View>
              <IconSymbol size={20} name="chevron.right" color={colors.muted} />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity className="mt-4 bg-error/20 rounded-xl p-4 items-center border border-error/30">
            <Text className="text-error font-semibold">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
