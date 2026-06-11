import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

export default function MentorScreen() {
  const colors = useColors();
  const [messages, setMessages] = useState([
    {
      id: "m1",
      type: "bot",
      text: "Hello! I'm your AI trading mentor. I'm here to help you improve your trading skills, answer questions about strategies, psychology, and risk management. What would you like to learn today?",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage = { id: `u${Date.now()}`, type: "user", text: inputText };
      setMessages([...messages, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const botMessage = {
          id: `b${Date.now()}`,
          type: "bot",
          text: "That's a great question! Based on your trading profile and recent trades, I recommend focusing on improving your risk management. Remember, the goal is consistent profits, not big wins. Would you like me to explain the 2% rule?",
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);

      setInputText("");
    }
  };

  return (
    <ScreenContainer className="p-4">
      <View className="flex-1 gap-4">
        {/* Header */}
        <View className="gap-1">
          <Text className="text-3xl font-bold text-foreground">AI Trading Mentor</Text>
          <Text className="text-base text-muted">Get personalized guidance</Text>
        </View>

        {/* Chat Messages */}
        <ScrollView className="flex-1 gap-3">
          {messages.map((message) => (
            <View
              key={message.id}
              className={`flex-row ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <View
                className={`max-w-xs rounded-2xl p-4 ${
                  message.type === "user"
                    ? "bg-primary rounded-br-none"
                    : "bg-surface border border-border rounded-bl-none"
                }`}
              >
                <Text
                  className={`text-base ${
                    message.type === "user" ? "text-background" : "text-foreground"
                  }`}
                >
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Resource Links */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-foreground">Learning Resources</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-1 bg-primary/10 border border-primary rounded-lg p-3 items-center"
              onPress={() => WebBrowser.openBrowserAsync("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
            >
              <IconSymbol size={20} name="arrow.up.right" color={colors.primary} />
              <Text className="text-xs text-primary font-semibold mt-1">Trading Videos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-primary/10 border border-primary rounded-lg p-3 items-center"
              onPress={() => WebBrowser.openBrowserAsync("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
            >
              <IconSymbol size={20} name="arrow.up.right" color={colors.primary} />
              <Text className="text-xs text-primary font-semibold mt-1">Strategies</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggested Questions */}
        <View className="gap-2">
          <Text className="text-sm text-muted">Suggested questions:</Text>
          <View className="gap-2">
            <TouchableOpacity
              className="bg-surface rounded-xl p-3 border border-border"
              onPress={() => {
                setInputText("How do I improve my win rate?");
              }}
            >
              <Text className="text-sm text-foreground">How do I improve my win rate?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface rounded-xl p-3 border border-border"
              onPress={() => {
                setInputText("What's the best risk management strategy?");
              }}
            >
              <Text className="text-sm text-foreground">What's the best risk management strategy?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input */}
        <View className="flex-row gap-2 items-end">
          <View className="flex-1 flex-row items-center gap-2 bg-surface rounded-xl px-3 border border-border">
            <TextInput
              className="flex-1 py-3 text-foreground"
              placeholder="Ask me anything..."
              placeholderTextColor={colors.muted}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
          </View>
          <TouchableOpacity
            className={`w-12 h-12 rounded-xl items-center justify-center ${
              inputText.trim() ? "bg-primary" : "bg-border"
            }`}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <IconSymbol
              size={20}
              name="paperplane.fill"
              color={inputText.trim() ? "white" : colors.muted}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}
