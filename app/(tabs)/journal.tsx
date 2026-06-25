import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { useFocusEffect } from "@react-navigation/native";

type Stats = {
  totalTrades: number;
  winRate: number;
  totalPnl: number;
};

export default function JournalScreen() {
  const colors = useColors();
  const router = useRouter();
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ totalTrades: 0, winRate: 0, totalPnl: 0 });
  const [loading, setLoading] = useState(true);

  const fetchJournalStats = useCallback(async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('journal_trades')
        .select('result, pnl')
        .eq('user_id', user.id);

      if (error) throw error;

      if (data && data.length > 0) {
        const total = data.length;
        const wins = data.filter(t => t.result === 'Win').length;
        const pnl = data.reduce((sum, t) => sum + (t.pnl || 0), 0);
        
        setStats({
          totalTrades: total,
          winRate: Math.round((wins / total) * 100),
          totalPnl: Math.round(pnl * 100) / 100
        });
      }
    } catch (error) {
      console.error('Error fetching journal stats:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchJournalStats();
    }, [fetchJournalStats])
  );

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
              <IconSymbol size={24} name="plus" color={colors.background} />
            </TouchableOpacity>
          </View>

          <Text className="text-base text-muted">
            Record and track every trade to improve your discipline
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} className="mt-10" />
          ) : (
            <>
              {/* Quick Actions */}
              <View className="mt-4 gap-3">
                <TouchableOpacity
                  className="bg-primary rounded-xl p-4 flex-row justify-between items-center"
                  onPress={() => router.push("/journal-list")}
                >
                  <View className="gap-1">
                    <Text className="text-lg font-bold text-background">View Journal</Text>
                    <Text className="text-sm text-background/80">{stats.totalTrades} trades recorded</Text>
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
                  onPress={() => router.push("/backtesting")}
                >
                  <View className="gap-1">
                    <Text className="text-lg font-semibold text-foreground">Performance Analysis</Text>
                    <Text className="text-sm text-muted">Detailed statistics</Text>
                  </View>
                  <IconSymbol size={24} name="chevron.right" color={colors.primary} />
                </TouchableOpacity>
              </View>

              {/* Stats */}
              <View className="mt-6 gap-2">
                <Text className="text-lg font-semibold text-foreground">Performance Summary</Text>
                <View className="flex-row gap-2">
                  <View className="flex-1 bg-surface rounded-xl p-3 border border-border items-center gap-1">
                    <Text className={`text-2xl font-bold ${stats.winRate >= 50 ? 'text-success' : 'text-error'}`}>
                      {stats.winRate}%
                    </Text>
                    <Text className="text-xs text-muted">Win Rate</Text>
                  </View>
                  <View className="flex-1 bg-surface rounded-xl p-3 border border-border items-center gap-1">
                    <Text className={`text-2xl font-bold ${stats.totalPnl >= 0 ? 'text-success' : 'text-error'}`}>
                      {stats.totalPnl >= 0 ? '+' : ''}${stats.totalPnl}
                    </Text>
                    <Text className="text-xs text-muted">Total P&L</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
