import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/hooks/use-auth";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useFocusEffect } from "@react-navigation/native";

type Profile = {
  username: string;
  level: string;
  lessons_completed: number;
  streak_days: number;
  total_trades: number;
  win_rate: number;
  total_pnl: number;
};

export default function ProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    try {
      // 1. Fetch profile
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const newProfile = {
          id: user.id,
          username: user.email?.split('@')[0],
          level: 'Beginner',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        const { data: created, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();
        
        if (createError) throw createError;
        data = created;
      } else if (error) {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} className="mt-10" />
          ) : (
            <>
              {/* Profile Header */}
              <View className="items-center gap-3">
                <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
                  <IconSymbol size={40} name="person.fill" color={colors.background} />
                </View>
                <Text className="text-2xl font-bold text-foreground">{profile?.username || 'Trader'}</Text>
                <Text className="text-sm text-muted">{profile?.level} • {profile?.streak_days} Day Streak</Text>
              </View>

              {/* Stats Cards */}
              <View className="gap-3">
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                  <Text className="text-sm text-muted">Lessons Completed</Text>
                  <Text className="text-4xl font-bold text-primary mt-1">{profile?.lessons_completed || 0}</Text>
                </View>
                <View className="flex-row gap-3">
                  <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                    <Text className="text-xs text-muted">Win Rate</Text>
                    <Text className="text-2xl font-bold text-foreground mt-1">{profile?.win_rate || 0}%</Text>
                  </View>
                  <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                    <Text className="text-xs text-muted">Total P&L</Text>
                    <Text className="text-2xl font-bold text-foreground mt-1">${profile?.total_pnl || 0}</Text>
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
                    <IconSymbol size={24} name="chart.bar.fill" color={colors.primary} />
                    <Text className="text-foreground font-semibold">Your Progress</Text>
                  </View>
                  <IconSymbol size={20} name="chevron.right" color={colors.muted} />
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
                  onPress={() => router.push("/journal-list")}
                >
                  <View className="flex-row items-center gap-3">
                    <IconSymbol size={24} name="book.fill" color={colors.primary} />
                    <Text className="text-foreground font-semibold">Full Journal</Text>
                  </View>
                  <IconSymbol size={20} name="chevron.right" color={colors.muted} />
                </TouchableOpacity>
              </View>

              {/* Settings */}
              <View className="gap-2">
                <Text className="text-lg font-semibold text-foreground">Account</Text>
                <TouchableOpacity 
                  className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
                  onPress={signOut}
                >
                  <View className="flex-row items-center gap-3">
                    <IconSymbol size={24} name="rectangle.portrait.and.arrow.right" color={colors.error} />
                    <Text className="text-error font-semibold">Sign Out</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
