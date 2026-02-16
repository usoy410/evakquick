import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  title,
  loading,
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return styles.buttonPrimary;
      case "secondary":
        return styles.buttonSecondary;
      case "outline":
        return styles.buttonOutline;
      default:
        return styles.buttonPrimary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return styles.buttonTextPrimary;
      case "secondary":
        return styles.buttonTextSecondary;
      case "outline":
        return styles.buttonTextOutline;
      default:
        return styles.buttonTextPrimary;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), isDisabled && styles.buttonDisabled]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#3182ce" : "#fff"} />
      ) : (
        <Text style={[styles.buttonText, getTextStyle()]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonPrimary: {
    backgroundColor: "#3182ce",
  },
  buttonSecondary: {
    backgroundColor: "#38a169",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#3182ce",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextPrimary: {
    color: "#fff",
  },
  buttonTextSecondary: {
    color: "#fff",
  },
  buttonTextOutline: {
    color: "#3182ce",
  },
});
