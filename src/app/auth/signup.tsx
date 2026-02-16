import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useAuth } from "@/src/contexts/AuthContext";
import { authStyles } from "@/src/styles/authStyles";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const { signup } = useAuth();

  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!name) {
      newErrors.name = "Full name is required";
      isValid = false;
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password);
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <View style={authStyles.header}>
        <Text style={authStyles.title}>Create Account</Text>
        <Text style={authStyles.subtitle}>Sign up to get started</Text>
      </View>

      <View style={authStyles.form}>
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          editable={!loading}
          error={errors.name}
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
          error={errors.email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          error={errors.password}
        />

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
          error={errors.confirmPassword}
        />

        <Button
          title="Sign Up"
          onPress={handleSignup}
          loading={loading}
          variant="primary"
        />
      </View>

      <View style={authStyles.footer}>
        <Text style={authStyles.footerText}>
          Already have an account?{" "}
          <Link href={{ pathname: "auth/login" } as any} style={authStyles.link}>
            Sign In
          </Link>
        </Text>
      </View>
    </View>
  );
}
