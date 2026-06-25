import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Category = {
  id: number;
  name: string;
  description: string;
};

export default function LearnScreen() {
  const colors = useColors();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('lesson_categories')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          <Text className="text-3xl font-bold text-foreground">Learning Path</Text>
          <Text className="text-base text-muted">
            Complete stages to become a disciplined trader
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} className="mt-10" />
          ) : (
            <View className="mt-4 gap-3">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className="bg-surface rounded-xl p-4 border border-border flex-row justify-between items-center"
                  onPress={() => router.push({
                    pathname: "/roadmap",
                    params: { categoryId: category.id, categoryName: category.name }
                  })}
                >
                  <View className="gap-1 flex-1 pr-4">
                    <Text className="text-lg font-semibold text-foreground">{category.name}</Text>
                    <Text className="text-sm text-muted" numberOfLines={2}>
                      {category.description}
                    </Text>
                  </View>
                  <IconSymbol size={24} name="chevron.right" color={colors.primary} />
                </TouchableOpacity>
              ))}

              <View className="h-4" />
              
              <TouchableOpacity
                className="bg-primary/10 rounded-xl p-4 border border-primary/20 flex-row justify-between items-center"
                onPress={() => router.push("/progress")}
              >
                <View className="gap-1">
                  <Text className="text-lg font-semibold text-primary">Your Progress</Text>
                  <Text className="text-sm text-muted">Track your scores</Text>
                </View>
                <IconSymbol size={24} name="chart.bar.fill" color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
