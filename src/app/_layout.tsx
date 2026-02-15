import { AuthProvider } from "@/src/contexts/AuthContext";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/signup" />
        </Stack>
      </SafeAreaView>
    </AuthProvider>
  );
}
const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },

  }
);
