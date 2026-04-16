import { colors } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const links = ["privacy policy", "terms of service", "contact us"];

export default function AboutScreen() {
  const handlePress = (link: string) => {
    console.log(`Pressed: ${link}`);
    // later: navigation or linking logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About</Text>
      </View>

      <View style={styles.linksContainer}>
        {links.map((link) => (
          <Pressable
            key={link}
            onPress={() => handlePress(link)}
            style={({ pressed }) => [
              styles.linkItem,
              pressed && styles.linkPressed,
            ]}
          >
            <Text style={styles.linkText}>{link}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>VERSION 0.1.0 － © 2024</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    justifyContent: "space-around",
  },

  header: {
    marginTop: 20,
    alignItems: "center",
  },

  title: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  linksContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },

  linkItem: {
    paddingVertical: 12,
    alignItems: "center",
  },

  linkPressed: {
    opacity: 0.6,
  },

  linkText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  footer: {
    paddingBottom: 20,
    alignItems: "center",
    marginBottom: 20,
  },

  versionText: {
    color: colors.surfaceHigh,
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
