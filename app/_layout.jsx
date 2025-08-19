import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import SafeScreen from "../components/common/SafeScreen";
import Toast from "react-native-toast-message";

export default function RootLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SafeScreen>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="details" />
            </Stack>
          </SafeScreen>
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </BottomSheetModalProvider>
      <Toast visibilityTime={5000} />
    </GestureHandlerRootView>
  );
}
