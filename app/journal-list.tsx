import { ScrollView, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Alert, Modal } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";

type Trade = {
  id: number;
  date: string;
  market: string;
  type: string;
  entry_price: number;
  exit_price: number;
  pnl: number;
  result: string;
  reason: string;
};

export default function JournalListScreen() {
  const colors = useColors();
  const router = useRouter();
  const { user } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // Form state for new trade
  const [newTrade, setNewTrade] = useState({
    market: '',
    type: 'Long',
    entry_price: '',
    exit_price: '',
    pnl: '',
    result: 'Win',
    reason: ''
  });

  useEffect(() => {
    fetchTrades();
  }, [user]);

  async function fetchTrades() {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('journal_trades')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setTrades(data || []);
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTrade() {
    if (!user) return;
    if (!newTrade.market || !newTrade.entry_price) {
      Alert.alert('Error', 'Please fill in at least market and entry price.');
      return;
    }

    try {
      const { error } = await supabase
        .from('journal_trades')
        .insert({
          user_id: user.id,
          market: newTrade.market,
          type: newTrade.type,
          entry_price: parseFloat(newTrade.entry_price),
          exit_price: parseFloat(newTrade.exit_price) || null,
          pnl: parseFloat(newTrade.pnl) || 0,
          result: newTrade.result,
          reason: newTrade.reason,
          date: new Date().toISOString()
        });

      if (error) throw error;
      
      Alert.alert('Success', 'Trade added to journal!');
      setIsAddModalVisible(false);
      fetchTrades();
      setNewTrade({ market: '', type: 'Long', entry_price: '', exit_price: '', pnl: '', result: 'Win', reason: '' });
    } catch (error) {
      console.error('Error adding trade:', error);
      Alert.alert('Error', 'Failed to add trade.');
    }
  }

  const filteredTrades = trades.filter(
    (trade) =>
      trade.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.reason?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalTrades: trades.length,
    wins: trades.filter((t) => t.result === "Win").length,
    losses: trades.filter((t) => t.result === "Loss").length,
    totalProfit: trades.reduce((sum, t) => sum + (t.pnl || 0), 0),
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-foreground">Journal Entries</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} className="mt-10" />
          ) : (
            <>
              <View className="flex-row gap-2">
                <View className="flex-1 bg-surface rounded-xl p-3 border border-border items-center">
                  <Text className="text-xl font-bold text-primary">{stats.totalTrades}</Text>
                  <Text className="text-xs text-muted">Trades</Text>
                </View>
                <View className="flex-1 bg-success/10 rounded-xl p-3 border border-success/30 items-center">
                  <Text className="text-xl font-bold text-success">{stats.wins}</Text>
                  <Text className="text-xs text-muted">Wins</Text>
                </View>
                <View className="flex-1 bg-error/10 rounded-xl p-3 border border-error/30 items-center">
                  <Text className="text-xl font-bold text-error">{stats.losses}</Text>
                  <Text className="text-xs text-muted">Losses</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-2 bg-surface rounded-xl px-3 border border-border">
                <IconSymbol size={20} name="magnifyingglass" color={colors.muted} />
                <TextInput
                  className="flex-1 py-3 text-foreground"
                  placeholder="Search trades..."
                  placeholderTextColor={colors.muted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <TouchableOpacity 
                className="bg-primary rounded-xl p-4 flex-row items-center justify-center gap-2"
                onPress={() => setIsAddModalVisible(true)}
              >
                <IconSymbol size={20} name="plus" color="white" />
                <Text className="text-background font-bold">Add New Trade</Text>
              </TouchableOpacity>

              <View className="gap-2 mb-10">
                {filteredTrades.map((trade) => (
                  <View key={trade.id} className="bg-surface rounded-xl p-4 border border-border gap-2">
                    <View className="flex-row justify-between">
                      <View>
                        <Text className="text-lg font-bold text-foreground">{trade.market}</Text>
                        <Text className="text-xs text-muted">{new Date(trade.date).toLocaleDateString()}</Text>
                      </View>
                      <View className="items-end">
                        <Text className={`text-lg font-bold ${trade.result === 'Win' ? 'text-success' : 'text-error'}`}>
                          {trade.pnl >= 0 ? '+' : ''}${trade.pnl}
                        </Text>
                        <Text className="text-xs text-muted">{trade.type}</Text>
                      </View>
                    </View>
                    {trade.reason && (
                      <Text className="text-sm text-muted italic">"{trade.reason}"</Text>
                    )}
                  </View>
                ))}
                {filteredTrades.length === 0 && (
                  <Text className="text-center text-muted mt-10">No trades found.</Text>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Add Trade Modal */}
      <Modal visible={isAddModalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-surface p-6 rounded-t-3xl gap-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-bold text-foreground">New Trade Entry</Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
                <IconSymbol name="xmark" size={24} color={colors.muted} />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Market (e.g. EUR/USD)"
              placeholderTextColor={colors.muted}
              className="bg-background border border-border p-4 rounded-xl text-foreground"
              value={newTrade.market}
              onChangeText={(t) => setNewTrade({...newTrade, market: t})}
            />

            <View className="flex-row gap-2">
              <TouchableOpacity 
                className={`flex-1 p-4 rounded-xl items-center ${newTrade.type === 'Long' ? 'bg-primary' : 'bg-background border border-border'}`}
                onPress={() => setNewTrade({...newTrade, type: 'Long'})}
              >
                <Text className={newTrade.type === 'Long' ? 'text-background font-bold' : 'text-foreground'}>Long</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`flex-1 p-4 rounded-xl items-center ${newTrade.type === 'Short' ? 'bg-primary' : 'bg-background border border-border'}`}
                onPress={() => setNewTrade({...newTrade, type: 'Short'})}
              >
                <Text className={newTrade.type === 'Short' ? 'text-background font-bold' : 'text-foreground'}>Short</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-2">
              <TextInput
                placeholder="Entry Price"
                placeholderTextColor={colors.muted}
                keyboardType="numeric"
                className="flex-1 bg-background border border-border p-4 rounded-xl text-foreground"
                value={newTrade.entry_price}
                onChangeText={(t) => setNewTrade({...newTrade, entry_price: t})}
              />
              <TextInput
                placeholder="Exit Price"
                placeholderTextColor={colors.muted}
                keyboardType="numeric"
                className="flex-1 bg-background border border-border p-4 rounded-xl text-foreground"
                value={newTrade.exit_price}
                onChangeText={(t) => setNewTrade({...newTrade, exit_price: t})}
              />
            </View>

            <TextInput
              placeholder="Profit/Loss ($)"
              placeholderTextColor={colors.muted}
              keyboardType="numeric"
              className="bg-background border border-border p-4 rounded-xl text-foreground"
              value={newTrade.pnl}
              onChangeText={(t) => setNewTrade({...newTrade, pnl: t})}
            />

            <View className="flex-row gap-2">
              <TouchableOpacity 
                className={`flex-1 p-4 rounded-xl items-center ${newTrade.result === 'Win' ? 'bg-success' : 'bg-background border border-border'}`}
                onPress={() => setNewTrade({...newTrade, result: 'Win'})}
              >
                <Text className={newTrade.result === 'Win' ? 'text-white font-bold' : 'text-foreground'}>Win</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`flex-1 p-4 rounded-xl items-center ${newTrade.result === 'Loss' ? 'bg-error' : 'bg-background border border-border'}`}
                onPress={() => setNewTrade({...newTrade, result: 'Loss'})}
              >
                <Text className={newTrade.result === 'Loss' ? 'text-white font-bold' : 'text-foreground'}>Loss</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Reason for trade"
              placeholderTextColor={colors.muted}
              multiline
              className="bg-background border border-border p-4 rounded-xl text-foreground h-20"
              value={newTrade.reason}
              onChangeText={(t) => setNewTrade({...newTrade, reason: t})}
            />

            <TouchableOpacity 
              className="bg-primary p-4 rounded-xl items-center"
              onPress={handleAddTrade}
            >
              <Text className="text-background font-bold text-lg">Save Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
