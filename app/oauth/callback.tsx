import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Supabase handles OAuth redirects automatically if configured.
    // This is a placeholder for custom logic if needed.
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenContainer className="items-center justify-center">
      <View className="gap-4 items-center">
        <ActivityIndicator size="large" color="#007AFF" />
        <Text className="text-lg font-semibold text-foreground">
          Completing authentication...
        </Text>
      </View>
    </ScreenContainer>
  );
}
