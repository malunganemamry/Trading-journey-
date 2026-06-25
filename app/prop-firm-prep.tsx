import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";

export default function PropFirmPrepScreen() {
  const colors = useColors();
  const router = useRouter();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    tradeCount: 0,
    winRate: 0,
    lessonsDone: 0,
    avgScore: 0
  });

  useEffect(() => {
    fetchData();
  }, [user]);

  async function fetchData() {
    if (!user) return;
    try {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      const { data: results } = await supabase.from('assessment_results').select('score').eq('user_id', user.id);
      
      const avg = results && results.length > 0 
        ? results.reduce((sum, r) => sum + r.score, 0) / results.length 
        : 0;

      setStats({
        tradeCount: profile?.total_trades || 0,
        winRate: profile?.win_rate || 0,
        lessonsDone: profile?.lessons_completed || 0,
        avgScore: Math.round(avg)
      });
    } catch (error) {
      console.error('Error fetching prop firm data:', error);
    } finally {
      setLoading(false);
    }
  }

  const requirements = [
    {
      id: "r1",
      title: "Consistent Trading",
      description: "100+ documented trades",
      progress: Math.min(100, (stats.tradeCount / 100) * 100),
    },
    {
      id: "r2",
      title: "Profitability",
      description: "Win rate 55%+",
      progress: Math.min(100, (stats.winRate / 55) * 100),
    },
    {
      id: "r3",
      title: "Knowledge Mastery",
      description: "Complete all fundamental lessons",
      progress: Math.min(100, (stats.lessonsDone / 20) * 100),
    },
    {
      id: "r4",
      title: "Quiz Performance",
      description: "Average score 80%+",
      progress: Math.min(100, (stats.avgScore / 80) * 100),
    },
  ];

  const overallReadiness = Math.round(requirements.reduce((sum, r) => sum + r.progress, 0) / requirements.length);

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-foreground">Prop Firm Prep</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} className="mt-10" />
          ) : (
            <>
              <View className="bg-primary rounded-2xl p-6 gap-3">
                <Text className="text-sm text-background/80">Overall Readiness Score</Text>
                <View className="flex-row items-center gap-4">
                  <Text className="text-5xl font-bold text-background">{overallReadiness}%</Text>
                  <View className="flex-1 gap-2">
                    <View className="h-3 bg-background/30 rounded-full overflow-hidden">
                      <View className="h-full bg-background" style={{ width: `${overallReadiness}%` }} />
                    </View>
                    <Text className="text-xs text-background/80">
                      {overallReadiness >= 80 ? "Ready to apply!" : "Keep building your edge."}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="gap-3">
                <Text className="text-lg font-semibold text-foreground">Readiness Checklist</Text>
                {requirements.map((req) => (
                  <View key={req.id} className="bg-surface rounded-xl p-4 border border-border gap-2">
                    <View className="flex-row justify-between items-start gap-2">
                      <View className="flex-1 gap-1">
                        <Text className="text-base font-semibold text-foreground">{req.title}</Text>
                        <Text className="text-sm text-muted">{req.description}</Text>
                      </View>
                      <View className={`px-2 py-1 rounded-full ${req.progress === 100 ? 'bg-success/20' : 'bg-primary/20'}`}>
                        <Text className={`text-xs font-bold ${req.progress === 100 ? 'text-success' : 'text-primary'}`}>
                          {req.progress === 100 ? 'Done' : `${Math.round(req.progress)}%`}
                        </Text>
                      </View>
                    </View>
                    <View className="h-2 bg-border rounded-full overflow-hidden">
                      <View className="h-full bg-primary" style={{ width: `${req.progress}%` }} />
                    </View>
                  </View>
                ))}
              </View>

              <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 gap-2 mb-10">
                <Text className="text-sm font-semibold text-primary">🎯 Next Steps</Text>
                <Text className="text-sm text-foreground">
                  Focus on improving your {requirements.sort((a,b) => a.progress - b.progress)[0].title.toLowerCase()} to increase your readiness score.
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
