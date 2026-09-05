// React
import { useState } from "react";

// React Native
import { Image, StyleSheet, Text, View } from "react-native";

// API
import { createWallet } from "../api/wallet";

// Components
import ErrorBanner from "../components/ErrorBanner";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

export function FirstWalletSetupScreen({ onNext }) {
  const [walletName, setWalletName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");
    try {
      await createWallet(walletName.trim(), initialBalance.trim());
      setWalletName("");
      setInitialBalance("");
      onNext && onNext();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/img-wallet-setup.png")}
        style={styles.imgWallet}
      />
      <Text style={styles.tvTitle}>Set up your wallet</Text>
      <Text style={styles.tvSubtitle}>
        Give your wallet a name and its starting balance.
      </Text>
      <InputField
        value={walletName}
        setValue={setWalletName}
        placeholder={"Enter a name (i.e. Pockit-Money)"}
        icon={"wallet-outline"}
      />
      <InputField
        value={initialBalance}
        setValue={setInitialBalance}
        placeholder={"Enter initial amount in Rupees (i.e. 1000)"}
        keyboardType="decimal-pad"
        icon={"cash-outline"}
      />
      <ErrorBanner message={error} />

      <PrimaryButton
        label="Save and Continue"
        loading={isLoading}
        onPress={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf7f0",
  },
  imgWallet: {
    height: 200,
    width: 300,
  },
  tvTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 8,
  },
  tvSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    textAlign: "center",
    color: "#555555",
    marginBottom: 15,
  },
});

export default FirstWalletSetupScreen;
