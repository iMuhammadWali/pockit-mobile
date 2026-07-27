import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";
import InputField from "../components/InputField";
import ErrorBanner from "../components/ErrorBanner";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import useAuth from "../hooks/useAuth";
import { loginRequest } from "../api/auth";
import { getCredentialError } from "../utils/validation";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigator = useNavigation();

  const handleLogin = async () => {
    const validationError = getCredentialError(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await loginRequest(email.trim(), password);
      login(data.accessToken, data.refreshToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareLayout>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.imgLogo}
        />
        <Text style={styles.tvLogin}>
          Log in to use <Text style={styles.tvPockit}>Pockit</Text>
        </Text>
        <InputField
          value={email}
          setValue={setEmail}
          placeholder={"Enter your email"}
          icon={"mail-outline"}
        />
        <InputField
          value={password}
          setValue={setPassword}
          placeholder={"Enter your password"}
          icon={"lock-closed-outline"}
          secureTextEntry
        />
        <ErrorBanner message={error} />
        <PrimaryButton label="Log In" loading={loading} onPress={handleLogin} />
        <Text style={styles.tvFooter}>
          Don't have an account?{" "}
          <Text
            style={styles.tvFooterLink}
            onPress={() => navigator.replace("Register")}
          >
            Register
          </Text>
        </Text>
      </View>
    </KeyboardAwareLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf7f0",
  },
  imgLogo: {
    height: 180,
    width: 180,
  },
  tvLogin: {
    marginVertical: 15,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    textAlign: "center",
  },
  tvPockit: {
    color: "#ff9999",
  },
  tvFooter: {
    marginTop: 0,
    fontFamily: "Poppins_400Regular",
  },
  tvFooterLink: {
    color: "#ff9999",
    fontWeight: "bold",
  },
});
