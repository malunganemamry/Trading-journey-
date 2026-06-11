import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

export default function StrategyBuilderScreen() {
  const colors = useColors();
  const [step, setStep] = useState(1);
  const [strategy, setStrategy] = useState({
    market: "",
    style: "",
    entryRules: "",
    exitRules: "",
    riskRules: "",
  });

  const markets = ["Forex", "Stocks", "Crypto"];
  const styles = ["Scalping", "Day Trading", "Swing Trading"];
  
  const videoLinks = {
    market: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    style: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    entry: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    exit: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    risk: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return strategy.market !== "";
      case 2:
        return strategy.style !== "";
      case 3:
        return strategy.entryRules.length > 0;
      case 4:
        return strategy.exitRules.length > 0;
      case 5:
        return strategy.riskRules.length > 0;
      default:
        return false;
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Progress */}
          <View className="gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-muted">Step {step}/5</Text>
              <Text className="text-sm font-semibold text-primary">{Math.round((step / 5) * 100)}%</Text>
            </View>
            <View className="h-2 bg-border rounded-full overflow-hidden">
              <View className="h-full bg-primary" style={{ width: `${(step / 5) * 100}%` }} />
            </View>
          </View>

          {/* Help Video */}
          <TouchableOpacity
            className="bg-primary/10 border border-primary rounded-xl p-3 flex-row justify-between items-center"
            onPress={() => {
              let videoUrl = videoLinks.market;
              if (step === 2) videoUrl = videoLinks.style;
              else if (step === 3) videoUrl = videoLinks.entry;
              else if (step === 4) videoUrl = videoLinks.exit;
              else if (step === 5) videoUrl = videoLinks.risk;
              WebBrowser.openBrowserAsync(videoUrl);
            }}
          >
            <View className="flex-1 gap-1">
              <Text className="text-xs font-semibold text-primary">Need help?</Text>
              <Text className="text-xs text-muted">Watch tutorial for this step</Text>
            </View>
            <IconSymbol size={18} name="arrow.up.right" color={colors.primary} />
          </TouchableOpacity>

          {/* Step Content */}
          <View className="gap-4">
            {step === 1 && (
              <>
                <Text className="text-2xl font-bold text-foreground">Which market do you trade?</Text>
                <View className="gap-2">
                  {markets.map((market) => (
                    <TouchableOpacity
                      key={market}
                      className={`p-4 rounded-xl border-2 ${
                        strategy.market === market ? "bg-primary border-primary" : "bg-surface border-border"
                      }`}
                      onPress={() => setStrategy({ ...strategy, market })}
                    >
                      <Text
                        className={`text-base font-semibold ${
                          strategy.market === market ? "text-background" : "text-foreground"
                        }`}
                      >
                        {market}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {step === 2 && (
              <>
                <Text className="text-2xl font-bold text-foreground">What's your trading style?</Text>
                <View className="gap-2">
                  {styles.map((style) => (
                    <TouchableOpacity
                      key={style}
                      className={`p-4 rounded-xl border-2 ${
                        strategy.style === style ? "bg-primary border-primary" : "bg-surface border-border"
                      }`}
                      onPress={() => setStrategy({ ...strategy, style })}
                    >
                      <Text
                        className={`text-base font-semibold ${
                          strategy.style === style ? "text-background" : "text-foreground"
                        }`}
                      >
                        {style}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {step === 3 && (
              <>
                <Text className="text-2xl font-bold text-foreground">Define your entry rules</Text>
                <TextInput
                  className="bg-surface rounded-xl p-4 text-foreground border border-border"
                  placeholder="e.g., Break and retest support with bullish engulfing"
                  placeholderTextColor={colors.muted}
                  value={strategy.entryRules}
                  onChangeText={(text) => setStrategy({ ...strategy, entryRules: text })}
                  multiline
                  numberOfLines={4}
                />
              </>
            )}

            {step === 4 && (
              <>
                <Text className="text-2xl font-bold text-foreground">Define your exit rules</Text>
                <TextInput
                  className="bg-surface rounded-xl p-4 text-foreground border border-border"
                  placeholder="e.g., Take profit at 2:1 risk-reward or stop loss at -1%"
                  placeholderTextColor={colors.muted}
                  value={strategy.exitRules}
                  onChangeText={(text) => setStrategy({ ...strategy, exitRules: text })}
                  multiline
                  numberOfLines={4}
                />
              </>
            )}

            {step === 5 && (
              <>
                <Text className="text-2xl font-bold text-foreground">Define your risk rules</Text>
                <TextInput
                  className="bg-surface rounded-xl p-4 text-foreground border border-border"
                  placeholder="e.g., Risk 1% per trade, max 2% daily drawdown"
                  placeholderTextColor={colors.muted}
                  value={strategy.riskRules}
                  onChangeText={(text) => setStrategy({ ...strategy, riskRules: text })}
                  multiline
                  numberOfLines={4}
                />
              </>
            )}
          </View>

          {/* Navigation */}
          <View className="flex-row gap-3 mt-6">
            <TouchableOpacity
              className={`flex-1 rounded-xl p-3 items-center border border-border ${step === 1 ? "opacity-50" : ""}`}
              onPress={handleBack}
              disabled={step === 1}
            >
              <Text className="text-foreground font-semibold">Back</Text>
            </TouchableOpacity>

            {step === 5 ? (
              <TouchableOpacity className="flex-1 bg-primary rounded-xl p-3 items-center" onPress={() => alert("Strategy saved!")}>
                <Text className="text-background font-bold">Generate Strategy</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className={`flex-1 rounded-xl p-3 items-center ${isStepComplete() ? "bg-primary" : "bg-border opacity-50"}`}
                onPress={handleNext}
                disabled={!isStepComplete()}
              >
                <Text className={`font-bold ${isStepComplete() ? "text-background" : "text-muted"}`}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
