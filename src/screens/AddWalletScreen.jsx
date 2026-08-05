import { useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import PaginationDots from "../components/PaginationDots";
import { useNavigation } from "@react-navigation/native";
import ErrorBanner from "../components/ErrorBanner";
import { createWallet } from "../api/wallet";

export function AddWalletScreen({ onNext }) {
  const [walletName, setWalletName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError("");
    try {
      // console.log(initialBalance.trim());
      // const result = await createWallet(walletName.trim(), initialBalance.trim());
      // setWalletName("");
      // setInitialBalance("");
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
    // borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf7f0",
  },
  imgWallet: {
    height: 200,
    width: 300,
        // borderWidth: 1
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

export default AddWalletScreen;
