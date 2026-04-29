import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Text, TextInput, View, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { T } from "../constants/theme";

function applyDefaultFont() {
  const setText = (Text as any).defaultProps || {};
  (Text as any).defaultProps = {
    ...setText,
    style: [{ fontFamily: "Inter_500Medium", color: T.text }, setText.style],
  };
  const setInput = (TextInput as any).defaultProps || {};
  (TextInput as any).defaultProps = {
    ...setInput,
    style: [{ fontFamily: "Inter_500Medium", color: T.text }, setInput.style],
  };
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf"),
    Inter_500Medium: require("@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf"),
    Inter_600SemiBold: require("@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf"),
    Inter_700Bold: require("@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf"),
    Inter_800ExtraBold: require("@expo-google-fonts/inter/800ExtraBold/Inter_800ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) applyDefaultFont();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: T.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={T.greenMid} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: T.bg },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="bar/[id]" options={{ presentation: "card" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
