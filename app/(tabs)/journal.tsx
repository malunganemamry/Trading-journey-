import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";

export default function JournalScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-3xl font-bold text-foreground">Trading Journal</Text>
            <TouchableOpacity
              className="bg-primary rounded-full p-3"
              onPress={() => router.push("/journal-list")}
            >
              <IconSymbol size={24} name="pencil" color={colors.background} />
            </TouchableOpacity>
          </View>

          <Text className="text-base text-muted">
            Record and track every trade
          </Text>

          {/* Quick Actions */}
          <View className="mt-4 gap-3">
            <TouchableOpacity
              className="bg-primary rounded-xl p-4 flex-row justify-between items-center"
              onPress={() => router.push("/journal-list")}
            >
              <View className="gap-1">
                <Text className="text-lg font-bold text-background">View Journal</Text>
                <Text className="text-sm text-background/80">4 trades recorded</Text>
              </View>
              <IconSymbol size={24} name="arrow.up.right" color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
              onPress={() => router.push("/mentor")}
            >
              <View className="gap-1">
                <Text className="text-lg font-semibold text-foreground">AI Mentor</Text>
                <Text className="text-sm text-muted">Get personalized guidance</Text>
              </View>
              <IconSymbol size={24} name="chevron.right" color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
              onPress={() => router.push("/prop-firm-prep")}
            >
              <View className="gap-1">
                <Text className="text-lg font-semibold text-foreground">Prop Firm Prep</Text>
                <Text className="text-sm text-muted">72% readiness</Text>
              </View>
              <IconSymbol size={24} name="chevron.right" color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
              onPress={() => router.push("/backtesting")}
            >
              <View className="gap-1">
                <Text className="text-lg font-semibold text-foreground">Backtesting</Text>
                <Text className="text-sm text-muted">Analyze performance</Text>
              </View>
              <IconSymbol size={24} name="chevron.right" color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View className="mt-6 gap-2">
            <Text className="text-lg font-semibold text-foreground">Quick Stats</Text>
            <View className="flex-row gap-2">
              <View className="flex-1 bg-surface rounded-xl p-3 border border-border items-center gap-1">
                <Text className="text-2xl font-bold text-success">75%</Text>
                <Text className="text-xs text-muted">Win Rate</Text>
              </View>
              <View className="flex-1 bg-surface rounded-xl p-3 border border-border items-center gap-1">
                <Text className="text-2xl font-bold text-primary">+$295</Text>
                <Text className="text-xs text-muted">Total P&L</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
