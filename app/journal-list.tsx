import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function JournalListScreen() {
  const colors = useColors();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const trades = [
    {
      id: "t1",
      date: "Jun 9, 2026",
      market: "EUR/USD",
      type: "Long",
      entry: 1.0850,
      exit: 1.0920,
      pnl: 120,
      result: "Win",
      reason: "Break and retest support",
      lesson: "Technical Analysis",
    },
    {
      id: "t2",
      date: "Jun 8, 2026",
      market: "AAPL",
      type: "Long",
      entry: 192.50,
      exit: 195.30,
      pnl: 85,
      result: "Win",
      reason: "Bullish engulfing pattern",
      lesson: "Candlestick Patterns",
    },
    {
      id: "t3",
      date: "Jun 7, 2026",
      market: "BTC/USD",
      type: "Short",
      entry: 45200,
      exit: 45320,
      pnl: -60,
      result: "Loss",
      reason: "Resistance breakout",
      lesson: "Risk Management",
    },
    {
      id: "t4",
      date: "Jun 6, 2026",
      market: "EUR/USD",
      type: "Long",
      entry: 1.0800,
      exit: 1.0950,
      pnl: 150,
      result: "Win",
      reason: "Support bounce",
      lesson: "Price Action",
    },
  ];

  const filteredTrades = trades.filter(
    (trade) =>
      trade.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalTrades: trades.length,
    wins: trades.filter((t) => t.result === "Win").length,
    losses: trades.filter((t) => t.result === "Loss").length,
    totalProfit: trades.reduce((sum, t) => sum + t.pnl, 0),
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Trading Journal</Text>
            <Text className="text-base text-muted">Track and analyze every trade</Text>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-2">
            <View className="flex-1 bg-surface rounded-xl p-3 border border-border items-center gap-1">
              <Text className="text-2xl font-bold text-primary">{stats.totalTrades}</Text>
              <Text className="text-xs text-muted">Total Trades</Text>
            </View>
            <View className="flex-1 bg-success/10 rounded-xl p-3 border border-success/30 items-center gap-1">
              <Text className="text-2xl font-bold text-success">{stats.wins}</Text>
              <Text className="text-xs text-muted">Wins</Text>
            </View>
            <View className="flex-1 bg-error/10 rounded-xl p-3 border border-error/30 items-center gap-1">
              <Text className="text-2xl font-bold text-error">{stats.losses}</Text>
              <Text className="text-xs text-muted">Losses</Text>
            </View>
          </View>

          {/* Total Profit */}
          <View className={`rounded-xl p-4 gap-2 ${stats.totalProfit >= 0 ? "bg-success/10 border border-success/30" : "bg-error/10 border border-error/30"}`}>
            <Text className="text-sm text-muted">Total P&L</Text>
            <Text className={`text-3xl font-bold ${stats.totalProfit >= 0 ? "text-success" : "text-error"}`}>
              {stats.totalProfit >= 0 ? "+" : ""} ${stats.totalProfit}
            </Text>
          </View>

          {/* Search */}
          <View className="flex-row items-center gap-2 bg-surface rounded-xl px-3 border border-border">
            <IconSymbol size={20} name="paperplane.fill" color={colors.muted} />
            <TextInput
              className="flex-1 py-3 text-foreground"
              placeholder="Search trades..."
              placeholderTextColor={colors.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Add Trade Button */}
          <TouchableOpacity className="bg-primary rounded-xl p-4 flex-row items-center justify-center gap-2">
            <IconSymbol size={20} name="pencil" color="white" />
            <Text className="text-background font-bold">Add New Trade</Text>
          </TouchableOpacity>

          {/* Trades List */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Recent Trades</Text>
            {filteredTrades.map((trade) => (
              <TouchableOpacity
                key={trade.id}
                className="bg-surface rounded-xl p-4 border border-border gap-2"
              >
                <View className="flex-row justify-between items-start">
                  <View className="gap-1 flex-1">
                    <Text className="text-base font-bold text-foreground">{trade.market}</Text>
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
                      {trade.result === "Win" ? "+" : ""} ${trade.pnl}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center text-sm">
                  <Text className="text-xs text-muted">
                    {trade.type} @ {trade.entry}
                  </Text>
                  <Text className="text-xs text-muted">{trade.lesson}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
