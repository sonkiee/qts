import { colors } from "@/constants/theme";
import { Feather, MaterialIcons } from "@expo/vector-icons/";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { TouchableOpacity } from "react-native";
import mobileAds from "react-native-google-mobile-ads";
import { SafeAreaProvider } from "react-native-safe-area-context";

// SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

export default function RootLayout() {
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      // Initialization complete!
      console.log("AdMob initialized", adapterStatuses);
    })
    .catch((error) => {
      console.error("AdMob initialization failed", error);
    });

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          title: "",
          headerStyle: {
            backgroundColor: colors.surface,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => router.navigate("/about")}>
                <MaterialIcons name="menu" size={24} color={colors.tertiary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            headerBackVisible: false,
            // headerTransparent: true,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Feather name="x" size={24} color={colors.tertiary} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
