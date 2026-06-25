import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { supabase } from '@/lib/supabase';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { useColors } from '@/hooks/use-colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const router = useRouter();
  const colors = useColors();

  async function handleAuth() {
    setLoading(true);
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) Alert.alert('Error', error.message);
      else Alert.alert('Success', 'Check your email for the confirmation link!');
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) Alert.alert('Error', error.message);
      else router.replace('/(tabs)');
    }
    setLoading(false);
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className="gap-6">
          <View className="gap-2 items-center">
            <Text className="text-4xl font-bold text-foreground">LogieFX</Text>
            <Text className="text-muted text-center">
              {isSignUp ? 'Create your trading account' : 'Welcome back, trader'}
            </Text>
          </View>

          <View className="gap-4">
            <View className="gap-1">
              <Text className="text-sm font-semibold text-foreground">Email</Text>
              <TextInput
                className="bg-surface border border-border rounded-xl p-4 text-foreground"
                placeholder="email@example.com"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View className="gap-1">
              <Text className="text-sm font-semibold text-foreground">Password</Text>
              <TextInput
                className="bg-surface border border-border rounded-xl p-4 text-foreground"
                placeholder="••••••••"
                placeholderTextColor={colors.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              className="bg-primary rounded-xl p-4 items-center mt-2"
              onPress={handleAuth}
              disabled={loading}
            >
              <Text className="text-background font-bold text-lg">
                {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsSignUp(!isSignUp)}
              className="items-center"
            >
              <Text className="text-primary font-semibold">
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
