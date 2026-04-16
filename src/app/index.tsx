import { colors } from "@/constants/theme";
import { useShare } from "@/hooks/use-share";
import { useQuoteStore } from "@/store/quote-store";
import { MaterialCommunityIcons } from "@expo/vector-icons/";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const quote = useQuoteStore((state) => state.quote);
  const nextQuote = useQuoteStore((state) => state.nextQuote);
  const prevQuote = useQuoteStore((state) => state.prevQuote);

  const toggleLike = useQuoteStore((s) => s.toggleLike);
  const liked = useQuoteStore((s) => s.liked);

  const { shareQuote } = useShare();

  const currentQuote = quote ?? "Loading quote...";

  const isLiked = liked.includes(currentQuote);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable
          style={({ pressed }) => [styles.quoteArea, pressed && styles.pressed]}
          onPress={nextQuote}
        >
          {/* <Text style={styles.quoteText}>Quote of the day:</Text> */}
          <Text style={styles.quoteText}>{currentQuote}</Text>

          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              {/* Swipe left or right for more quotes */}
              tap anywhere for next
            </Text>
          </View>
        </Pressable>

        <View style={styles.buttonContainer}>
          <TouchableOpacity disabled onPress={() => console.log("prev")}>
            <MaterialCommunityIcons
              name="history"
              size={24}
              color={colors.onSurfaceVariant}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleLike(currentQuote)}>
            <MaterialCommunityIcons
              name="cards-heart"
              size={24}
              color={isLiked ? colors.accentDanger : colors.onSurfaceVariant}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => shareQuote(currentQuote)}>
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color={colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  quoteArea: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,

    flex: 1,
    backgroundColor: colors.surface,

    // justifyContent: "center",
    gap: 20,
    marginTop: 40,
    // transform: [{ scale: pressed ? 0.98 : 1 }],
  },

  pressed: {
    opacity: 0.6,
  },
  quoteText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 26,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  instructionContainer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    width: "100%",
  },
  instructionText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    textTransform: "uppercase",
  },
});

// const handlePrev = () => {
//   Alert.alert("Unlock Previous", "Watch a short ad to go back further", [
//     { text: "Cancel", style: "cancel" },
//     {
//       text: "Watch Ad",
//       onPress: () => {
//         console.log("Show ad here");
//         prevQuote();
//       },
//     },
//   ]);
// };
