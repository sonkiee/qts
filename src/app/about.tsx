import { colors } from "@/constants/theme";
import * as WebBrowser from "expo-web-browser";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const links = [
  {
    title: "Privacy Policy",
    url: "https://lock-in-page.pages.dev/privacy-policy",
  },
  { title: "Terms of Service", url: "https://lock-in-page.pages.dev/terms" },
  { title: "Contact Us", url: "https://lock-in-page.pages.dev/contact" },
];

export default function AboutScreen() {
  const openWebLink = async (url: string) => {
    try {
      const result = await WebBrowser.openBrowserAsync(url, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
      });

      if (result.type === "cancel") {
        console.log("User closed the web browser");
      }
    } catch (error) {
      console.error("Failed to open link:", error);
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About</Text>
      </View>

      <View style={styles.linksContainer}>
        {links.map((link) => (
          <Pressable
            key={link.url}
            onPress={() => openWebLink(link.url)}
            style={({ pressed }) => [
              styles.linkItem,
              pressed && styles.linkPressed,
            ]}
          >
            <Text style={styles.linkText}>{link.title}</Text>
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
