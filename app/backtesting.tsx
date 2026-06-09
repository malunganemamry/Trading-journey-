import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function BacktestingScreen() {
  const colors = useColors();

  const stats = {
    totalTrades: 45,
    winRate: 62,
    profitFactor: 2.15,
    avgRiskReward: 1.8,
    totalProfit: 1250,
    largestWin: 450,
    largestLoss: -200,
    consecutiveWins: 5,
    consecutiveLosses: 2,
  };

  const StatCard = ({ label, value, icon }: { label: string; value: string | number; icon: string }) => (
    <View className="bg-surface rounded-xl p-4 border border-border gap-2">
      <View className="flex-row items-center gap-2">
        <IconSymbol size={20} name={icon as any} color={colors.primary} />
        <Text className="text-sm text-muted">{label}</Text>
      </View>
      <Text className="text-2xl font-bold text-foreground">{value}</Text>
    </View>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Backtesting Center</Text>
            <Text className="text-base text-muted">Analyze your trading performance</Text>
          </View>

          {/* Key Metrics */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Performance Metrics</Text>
            <View className="gap-2">
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <StatCard label="Total Trades" value={stats.totalTrades} icon="chart.line.uptrend.xyaxis" />
                </View>
                <View className="flex-1">
                  <StatCard label="Win Rate" value={`${stats.winRate}%`} icon="checkmark.circle.fill" />
                </View>
              </View>
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <StatCard label="Profit Factor" value={stats.profitFactor} icon="arrow.up.right" />
                </View>
                <View className="flex-1">
                  <StatCard label="Avg Risk:Reward" value={stats.avgRiskReward} icon="chart.line.uptrend.xyaxis" />
                </View>
              </View>
            </View>
          </View>

          {/* Profit/Loss */}
          <View className="bg-success/10 rounded-xl p-4 border border-success/30 gap-2">
            <Text className="text-sm text-muted">Total Profit/Loss</Text>
            <Text className="text-4xl font-bold text-success">+${stats.totalProfit}</Text>
            <View className="h-2 bg-success/30 rounded-full overflow-hidden mt-2">
              <View className="h-full w-3/4 bg-success" />
            </View>
          </View>

          {/* Detailed Stats */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Detailed Statistics</Text>
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <View className="flex-row justify-between items-center pb-3 border-b border-border">
                <Text className="text-foreground">Largest Win</Text>
                <Text className="text-lg font-bold text-success">+${stats.largestWin}</Text>
              </View>
              <View className="flex-row justify-between items-center pb-3 border-b border-border">
                <Text className="text-foreground">Largest Loss</Text>
                <Text className="text-lg font-bold text-error">${stats.largestLoss}</Text>
              </View>
              <View className="flex-row justify-between items-center pb-3 border-b border-border">
                <Text className="text-foreground">Consecutive Wins</Text>
                <Text className="text-lg font-bold text-primary">{stats.consecutiveWins}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-foreground">Consecutive Losses</Text>
                <Text className="text-lg font-bold text-warning">{stats.consecutiveLosses}</Text>
              </View>
            </View>
          </View>

          {/* Trade History */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Recent Trades</Text>
            <View className="gap-2">
              {[
                { date: "Jun 9", market: "EUR/USD", result: "Win", pnl: "+$120" },
                { date: "Jun 8", market: "AAPL", result: "Win", pnl: "+$85" },
                { date: "Jun 7", market: "BTC/USD", result: "Loss", pnl: "-$60" },
                { date: "Jun 6", market: "EUR/USD", result: "Win", pnl: "+$150" },
              ].map((trade, index) => (
                <View key={index} className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center">
                  <View className="gap-1">
                    <Text className="text-base font-semibold text-foreground">{trade.market}</Text>
                    <Text className="text-sm text-muted">{trade.date}</Text>
                  </View>
                  <View className="items-end gap-1">
                    <View
                      className={`px-2 py-1 rounded-full ${
                        trade.result === "Win" ? "bg-success/20" : "bg-error/20"
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          trade.result === "Win" ? "text-success" : "text-error"
                        }`}
                      >
                        {trade.result}
                      </Text>
                    </View>
                    <Text
                      className={`text-lg font-bold ${
                        trade.result === "Win" ? "text-success" : "text-error"
                      }`}
                    >
                      {trade.pnl}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity className="bg-primary rounded-xl p-4 items-center">
            <Text className="text-background font-bold text-lg">Export Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
