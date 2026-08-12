import { StyleSheet, Text, View, Image } from "react-native";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { useNavigation } from "@react-navigation/native";
import PaginationDots from "../components/PaginationDots";

export function AddWalletSuccessScreen() {
  const navigator = useNavigation();

  const handleGoToDashboard = () => {
    // Navigate to HomeTabs (Dashboard)
    navigator.navigate("HomeTabs");
  };

  const handleAddAnother = () => {
    // Navigate back to AddWallet to create another one
    navigator.navigate("AddWallet");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/img-wallet-success_3.png")}
        style={styles.imgSuccess}
      />

      <Text style={styles.tvTitle}>You're All Set!</Text>

      <Text style={styles.tvSubtitle}>
        Your first wallet is ready. You can add more wallets or start tracking
        your expenses now.
      </Text>

      <View style={styles.buttonContainer}>
        <PrimaryButton label="Go to Dashboard" onPress={handleGoToDashboard} />
        <SecondaryButton
          label="Add Another Wallet"
          onPress={handleAddAnother}
          style={styles.secondaryBtn}
        />
      </View>
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
  imgSuccess: {
    height: 280,
    width: 300,
  },
  tvTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 8,
  },
  tvSubtitle: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "#555555",
    marginBottom: 0,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 40,
  },
  secondaryBtn: {
    marginTop: -15, // offsets the large marginVertical from PrimaryButton to space them nicely
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cccccc",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: "#ff9999",
  },
});

export default AddWalletSuccessScreen;
