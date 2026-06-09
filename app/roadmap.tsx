import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { LEARNING_STAGES } from "@/lib/assessment-data";
import { useRouter } from "expo-router";

export default function RoadmapScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Your Learning Roadmap</Text>
            <Text className="text-base text-muted">Complete stages to become a disciplined trader</Text>
          </View>

          {/* Stages */}
          <View className="gap-3">
            {LEARNING_STAGES.map((stage, index) => {
              const isUnlocked = index <= 2; // First 3 stages unlocked for demo
              const isCompleted = index < 1; // First stage completed for demo

              return (
                <View key={stage.id} className="gap-2">
                  {/* Stage Card */}
                  <TouchableOpacity
                    disabled={!isUnlocked}
                    className={`rounded-xl p-4 border ${
                      isCompleted
                        ? "bg-primary/10 border-primary"
                        : isUnlocked
                          ? "bg-surface border-border"
                          : "bg-surface/50 border-border opacity-50"
                    }`}
                  >
                    <View className="flex-row justify-between items-start gap-3">
                      <View className="flex-1 gap-1">
                        <View className="flex-row items-center gap-2">
                          <Text className="text-lg font-bold text-foreground">Stage {stage.id}</Text>
                          {isCompleted && (
                            <IconSymbol size={20} name="checkmark.circle.fill" color={colors.primary} />
                          )}
                          {!isUnlocked && (
                            <IconSymbol size={20} name="lock.fill" color={colors.muted} />
                          )}
                        </View>
                        <Text className="text-base font-semibold text-foreground">{stage.name}</Text>
                        <Text className="text-sm text-muted">{stage.description}</Text>
                      </View>
                      {isUnlocked && (
                        <IconSymbol size={24} name="chevron.right" color={colors.primary} />
                      )}
                    </View>

                    {/* Progress bar for unlocked stages */}
                    {isUnlocked && (
                      <View className="mt-3 h-2 bg-border rounded-full overflow-hidden">
                        <View
                          className="h-full bg-primary"
                          style={{ width: `${isCompleted ? 100 : index === 1 ? 50 : 0}%` }}
                        />
                      </View>
                    )}
                  </TouchableOpacity>

                  {/* Connector line */}
                  {index < LEARNING_STAGES.length - 1 && (
                    <View className="h-4 items-center">
                      <View className="w-1 h-full bg-border" />
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Info Box */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 gap-2">
            <Text className="text-sm font-semibold text-primary">💡 Pro Tip</Text>
            <Text className="text-sm text-foreground">
              You cannot skip stages. Complete all lessons and pass the quiz to unlock the next stage.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
