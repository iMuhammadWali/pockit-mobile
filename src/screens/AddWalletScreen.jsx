import { useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

export function AddWalletScreen() {
  const [walletName, setWalletName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const { isNewUser } = useAuth();
  const navigator = useNavigation();

  const handleSave = () => {
    // if (!walletName.trim()) {
    //   return;
    // }
    navigator.navigate("HomeTabs")    
  };

  return (
    <KeyboardAwareLayout>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/pockit-wallet.png")}
            style={styles.imgWallet}
          />
          <Text style={styles.tvTitle}>Set up your wallet</Text>
          <Text style={styles.tvSubtitle}>
            Give your main stash a name and its starting balance.
          </Text>
          <InputField
            value={walletName}
            setValue={setWalletName}
            placeholder={"e.g., Main Savings"}
            icon={"wallet-outline"}
          />
          <InputField
            value={initialBalance}
            setValue={setInitialBalance}
            placeholder={"0.00"}
            prefixText="$ "
            keyboardType="decimal-pad"
          />
          <PrimaryButton
            label="Save & Continue"
            loading={loading}
            onPress={handleSave}
          />
        </View>
      </ScrollView>
    </KeyboardAwareLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
    backgroundColor: "#fdf7f0",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    marginBottom: 40,
  },
});

export default AddWalletScreen;