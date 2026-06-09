import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";

export default function BooksScreen() {
  const colors = useColors();
  const router = useRouter();

  const books = [
    {
      id: "b1",
      title: "Trading in the Zone",
      author: "Mark Douglas",
      level: "Beginner",
      summary: "Master the psychology of trading and develop the mindset of a professional trader.",
      keyLessons: ["Trading psychology", "Risk management", "Discipline"],
      progressPercentage: 45,
    },
    {
      id: "b2",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      level: "Beginner",
      summary: "Understand how psychology influences financial decisions and wealth building.",
      keyLessons: ["Financial psychology", "Long-term thinking", "Behavioral finance"],
      progressPercentage: 20,
    },
    {
      id: "b3",
      title: "The Daily Trading Coach",
      author: "Brett Steenbarger",
      level: "Intermediate",
      summary: "Daily lessons and exercises to improve your trading performance.",
      keyLessons: ["Daily practice", "Performance improvement", "Self-coaching"],
      progressPercentage: 0,
    },
    {
      id: "b4",
      title: "Best Loser Wins",
      author: "Tom Hougaard",
      level: "Intermediate",
      summary: "Learn how losing trades can teach you more than winning ones.",
      keyLessons: ["Loss analysis", "Risk management", "Strategy refinement"],
      progressPercentage: 0,
    },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="gap-1">
            <Text className="text-3xl font-bold text-foreground">Recommended Books</Text>
            <Text className="text-base text-muted">Curated by level to accelerate your learning</Text>
          </View>

          {/* Books List */}
          <View className="gap-3">
            {books.map((book) => (
              <TouchableOpacity
                key={book.id}
                className="bg-surface rounded-xl p-4 border border-border gap-3"
              >
                <View className="flex-row justify-between items-start gap-3">
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-lg font-bold text-foreground flex-1">{book.title}</Text>
                      <IconSymbol size={20} name="star.fill" color={colors.primary} />
                    </View>
                    <Text className="text-sm text-muted">by {book.author}</Text>
                    <View className="bg-primary/20 rounded-full px-2 py-1 self-start mt-1">
                      <Text className="text-xs font-semibold text-primary">{book.level}</Text>
                    </View>
                  </View>
                </View>

                <Text className="text-sm text-foreground">{book.summary}</Text>

                {/* Key Lessons */}
                <View className="gap-1">
                  <Text className="text-xs font-semibold text-muted">Key Lessons:</Text>
                  <View className="flex-row flex-wrap gap-1">
                    {book.keyLessons.map((lesson, index) => (
                      <View key={index} className="bg-primary/10 rounded-full px-2 py-1">
                        <Text className="text-xs text-primary">{lesson}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Progress */}
                {book.progressPercentage > 0 && (
                  <View className="gap-1">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-xs text-muted">Progress</Text>
                      <Text className="text-xs font-semibold text-primary">{book.progressPercentage}%</Text>
                    </View>
                    <View className="h-2 bg-border rounded-full overflow-hidden">
                      <View
                        className="h-full bg-primary"
                        style={{ width: `${book.progressPercentage}%` }}
                      />
                    </View>
                  </View>
                )}

                {/* Action Button */}
                <TouchableOpacity className="bg-primary/10 rounded-lg p-2 items-center">
                  <Text className="text-sm font-semibold text-primary">
                    {book.progressPercentage > 0 ? "Continue Reading" : "Start Reading"}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          {/* Info Box */}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 gap-2">
            <Text className="text-sm font-semibold text-primary">📚 Reading Recommendation</Text>
            <Text className="text-sm text-foreground">
              Read books aligned with your current level. As you progress, unlock advanced reading materials.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
