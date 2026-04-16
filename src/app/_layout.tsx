import { colors } from "@/constants/theme";
import { Feather, MaterialIcons } from "@expo/vector-icons/";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
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
