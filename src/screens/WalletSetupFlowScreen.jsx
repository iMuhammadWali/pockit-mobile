import FirstWalletSetupScreen from "./FirstWalletSetupScreen";
import WelcomeScreen from "./WelcomeScreen";
import WalletSuccessScreen from "./WalletSuccessScreen";
import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import PaginationDots from "../components/PaginationDots";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const WalletSetupFlowScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
    //   navigation.goBack();
    }
  };

  return (
    <KeyboardAwareLayout>
      <View style={styles.header}>
        <Pressable 
          onPress={handlePreviousStep} 
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed
          ]}
        >
          <Ionicons name="chevron-back" size={22} color="#333333" />
        </Pressable>
        <View style={styles.dotsContainer}>
          <PaginationDots totalSteps={3} currentStep={currentStep} />
        </View>
        <View style={styles.rightPlaceholder} />
      </View>

      <View style={styles.contentContainer}>
        {currentStep === 0 && <WelcomeScreen onNext={handleNextStep} />}
        {currentStep === 1 && (
          <FirstWalletSetupScreen onNext={handleNextStep} />
        )}
        {currentStep === 2 && (
          <WalletSuccessScreen onAddAnother={() => setCurrentStep(1)} />
        )}
      </View>
    </KeyboardAwareLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#fdf7f0",
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f2ece4",
  },
  backButtonPressed: {
    backgroundColor: "#f9f9f9",
    transform: [{ scale: 0.96 }],
  },
  dotsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rightPlaceholder: {
    width: 44,
  },
  contentContainer: {
    flex: 1,
  },
});

export default WalletSetupFlowScreen;

