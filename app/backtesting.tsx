import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";

type Trade = {
  date: string;
  market: string;
  result: string;
  pnl: number;
};

export default function BacktestingScreen() {
  const colors = useColors();
  const router = useRouter();
  const { user } = useAuth();
  
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTrades: 0,
    winRate: 0,
    totalProfit: 0,
    largestWin: 0,
    largestLoss: 0,
  });

  useEffect(() => {
    fetchTrades();
  }, [user]);

  async function fetchTrades() {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('journal_trades')
        .select('date, market, result, pnl')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      
      const tradeData = data || [];
      setTrades(tradeData);

      if (tradeData.length > 0) {
        const total = tradeData.length;
        const wins = tradeData.filter(t => t.result === 'Win').length;
        const pnl = tradeData.reduce((sum, t) => sum + (t.pnl || 0), 0);
        const maxWin = Math.max(...tradeData.map(t => t.pnl || 0));
        const maxLoss = Math.min(...tradeData.map(t => t.pnl || 0));

        setStats({
          totalTrades: total,
          winRate: Math.round((wins / total) * 100),
          totalProfit: Math.round(pnl * 100) / 100,
          largestWin: maxWin > 0 ? maxWin : 0,
          largestLoss: maxLoss < 0 ? maxLoss : 0,
        });
      }
    } catch (error) {
      console.error('Error fetching trades for analysis:', error);
    } finally {
      setLoading(false);
    }
  }

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
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-foreground">Performance</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} className="mt-10" />
          ) : (
            <>
              <View className="gap-3">
                <Text className="text-lg font-semibold text-foreground">Key Metrics</Text>
                <View className="gap-2">
                  <View className="flex-row gap-2">
                    <View className="flex-1">
                      <StatCard label="Total Trades" value={stats.totalTrades} icon="chart.line.uptrend.xyaxis" />
                    </View>
                    <View className="flex-1">
                      <StatCard label="Win Rate" value={`${stats.winRate}%`} icon="checkmark.circle.fill" />
                    </View>
                  </View>
                </View>
              </View>

              <View className={`${stats.totalProfit >= 0 ? 'bg-success/10 border-success/30' : 'bg-error/10 border-error/30'} rounded-xl p-4 border gap-2`}>
                <Text className="text-sm text-muted">Total Profit/Loss</Text>
                <Text className={`text-4xl font-bold ${stats.totalProfit >= 0 ? 'text-success' : 'text-error'}`}>
                  {stats.totalProfit >= 0 ? '+' : ''}${stats.totalProfit}
                </Text>
              </View>

              <View className="gap-3">
                <Text className="text-lg font-semibold text-foreground">Detailed Stats</Text>
                <View className="bg-surface rounded-xl p-4 border border-border gap-3">
                  <View className="flex-row justify-between items-center pb-3 border-b border-border">
                    <Text className="text-foreground">Largest Win</Text>
                    <Text className="text-lg font-bold text-success">+${stats.largestWin}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-foreground">Largest Loss</Text>
                    <Text className="text-lg font-bold text-error">${stats.largestLoss}</Text>
                  </View>
                </View>
              </View>

              <View className="gap-3 mb-10">
                <Text className="text-lg font-semibold text-foreground">Recent History</Text>
                <View className="gap-2">
                  {trades.slice(0, 5).map((trade, index) => (
                    <View key={index} className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center">
                      <View className="gap-1">
                        <Text className="text-base font-semibold text-foreground">{trade.market}</Text>
                        <Text className="text-sm text-muted">{new Date(trade.date).toLocaleDateString()}</Text>
                      </View>
                      <View className="items-end">
                        <Text className={`text-lg font-bold ${trade.result === 'Win' ? 'text-success' : 'text-error'}`}>
                          {trade.pnl >= 0 ? '+' : ''}${trade.pnl}
                        </Text>
                        <Text className={`text-xs font-bold ${trade.result === 'Win' ? 'text-success' : 'text-error'}`}>
                          {trade.result}
                        </Text>
                      </View>
                    </View>
                  ))}
                  {trades.length === 0 && (
                    <Text className="text-center text-muted mt-4">No trade history found.</Text>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
