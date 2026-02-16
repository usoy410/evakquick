import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a202c",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
  },
  form: {
    marginBottom: 24,
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#718096",
  },
  link: {
    color: "#3182ce",
    fontWeight: "600",
  },
});
