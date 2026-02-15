import Map from "@/src/components/Map";
import { useAuth } from "@/src/contexts/AuthContext";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Map />
      <View style={styles.container}>
        {user ? (
          <>
            <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
            <TouchableOpacity style={styles.button} onPress={logout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.infoText}>Form? or Details of the location</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.loginButton]}
                onPress={() => router.push({ pathname: "auth/login" } as any)}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.signupButton]}
                onPress={() => router.push({ pathname: "auth/signup" } as any)}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a202c",
  },
  infoText: {
    fontSize: 16,
    color: "#718096",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#3182ce",
  },
  signupButton: {
    backgroundColor: "#38a169",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
