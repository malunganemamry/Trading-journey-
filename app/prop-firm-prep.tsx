import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function PropFirmPrepScreen() {
  const colors = useColors();

  const readinessScore = 72;
  const requirements = [
    {
      id: "r1",
      title: "Consistent Profitability",
      description: "3+ months of profitable trading",
      status: "in_progress",
      progress: 65,
    },
    {
      id: "r2",
      title: "Risk Management",
      description: "Maintain 1-2% risk per trade",
      status: "completed",
      progress: 100,
    },
    {
      id: "r3",
      title: "Psychology Mastery",
      description: "Score 80%+ on psychology tests",
      status: "in_progress",
      progress: 72,
    },
    {
      id: "r4",
      title: "Strategy Documentation",
      description: "Written trading plan with rules",
      status: "completed",
      progress: 100,
    },
    {
      id: "r5",
      title: "Trade Journal",
      description: "100+ documented trades",
      status: "in_progress",
      progress: 45,
    },
    {
      id: "r6",
      title: "Performance Metrics",
      description: "Win rate 55%+ and profit factor 1.5+",
      status: "not_started",
      progress: 0,
    },
  ];

  const topFirms = [
    { id: "f1", name: "Funded Trading Plus", minCapital: "$50k", drawdown: "10%", profit: "80/20" },
    { id: "f2", name: "The5ers", minCapital: "$100k", drawdown: "12%", profit: "70/30" },
    { id: "f3", name: "Topstep Trader", minCapital: "$25k", drawdown: "8%", profit: "90/10" },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      completed: { bg: "bg-success/20", text: "text-success", label: "✓ Completed" },
      in_progress: { bg: "bg-primary/20", text: "text-primary", label: "In Progress" },
      not_started: { bg: "bg-border", text: "text-muted", label: "Not Started" },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.not_started;
    return (
      <View className={`${config.bg} rounded-full px-2 py-1`}>
        <Text className={`text-xs font-semibold ${config.text}`}>{config.label}</Text>
      </View>
    );
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Prop Firm Readiness</Text>
            <Text className="text-base text-muted">Track your journey to funded trading</Text>
          </View>

          {/* Readiness Score */}
          <View className="bg-gradient-to-r from-primary to-primary/60 rounded-2xl p-6 gap-3">
            <Text className="text-sm text-background/80">Overall Readiness Score</Text>
            <View className="flex-row items-center gap-4">
              <Text className="text-5xl font-bold text-background">{readinessScore}%</Text>
              <View className="flex-1 gap-2">
                <View className="h-3 bg-background/30 rounded-full overflow-hidden">
                  <View className="h-full w-3/4 bg-background" />
                </View>
                <Text className="text-xs text-background/80">Almost ready!</Text>
              </View>
            </View>
          </View>

          {/* Requirements */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Readiness Checklist</Text>
            {requirements.map((req) => (
              <View key={req.id} className="bg-surface rounded-xl p-4 border border-border gap-2">
                <View className="flex-row justify-between items-start gap-2">
                  <View className="flex-1 gap-1">
                    <Text className="text-base font-semibold text-foreground">{req.title}</Text>
                    <Text className="text-sm text-muted">{req.description}</Text>
                  </View>
                  <StatusBadge status={req.status} />
                </View>
                <View className="h-2 bg-border rounded-full overflow-hidden">
                  <View
                    className="h-full bg-primary"
                    style={{ width: `${req.progress}%` }}
                  />
                </View>
                <Text className="text-xs text-muted">{req.progress}% Complete</Text>
              </View>
            ))}
          </View>

          {/* Top Prop Firms */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Top Prop Firms</Text>
            {topFirms.map((firm) => (
              <TouchableOpacity
                key={firm.id}
                className="bg-surface rounded-xl p-4 border border-border gap-2"
              >
                <View className="flex-row justify-between items-start">
                  <Text className="text-base font-bold text-foreground flex-1">{firm.name}</Text>
                  <IconSymbol size={20} name="arrow.up.right" color={colors.primary} />
                </View>
                <View className="flex-row gap-4">
                  <View className="gap-1">
                    <Text className="text-xs text-muted">Min Capital</Text>
                    <Text className="text-sm font-semibold text-foreground">{firm.minCapital}</Text>
                  </View>
                  <View className="gap-1">
                    <Text className="text-xs text-muted">Drawdown</Text>
                    <Text className="text-sm font-semibold text-foreground">{firm.drawdown}</Text>
                  </View>
                  <View className="gap-1">
                    <Text className="text-xs text-muted">Profit Split</Text>
                    <Text className="text-sm font-semibold text-foreground">{firm.profit}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Info Box */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 gap-2">
            <Text className="text-sm font-semibold text-primary">🎯 Next Steps</Text>
            <Text className="text-sm text-foreground">
              Complete 50 more trades and reach 60% win rate to unlock prop firm applications.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
