import { StyleSheet, Text, View, Image } from "react-native";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

export function WelcomeScreen() {
  const navigator = useNavigation();

  const handleLetsGo = () => {
    navigator.navigate("AddWallets");
  };

  return (
    <KeyboardAwareLayout>
      <View style={styles.container}>
        <Image
          source={require("../../assets/pockit-welcome.png")}
          style={styles.imgWelcome}
        />
        <Text style={styles.tvTitle}>Welcome to <Text style={styles.tvPockit}>Pockit!</Text></Text>
        <Text style={styles.tvSubtitle}>
          Manage all your wallets in one place. Let's start by setting up your first one.
        </Text>
        <PrimaryButton
          label="Create my first wallet"
          onPress={handleLetsGo}
        />
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
  imgWelcome: {
    height: 250,
    width: 250,
    marginBottom: 20,
  },
  tvTitle: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  tvSubtitle: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "#555555",
    marginBottom: 20,
    lineHeight: 24,
  },
  tvPockit: {
    color: "#ff9999",
  },
});

export default WelcomeScreen;