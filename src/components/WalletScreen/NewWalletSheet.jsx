// React
import { useEffect, useState } from "react";

// React Native
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Icons
import Ionicons from "@expo/vector-icons/Ionicons";

// API
import { createWallet } from "../../api/wallet";

// Components
import ErrorBanner from "../ErrorBanner";
import InputField from "../InputField";

export default function NewWalletSheet({ isVisible, onClose, onCreated }) {
  const insets = useSafeAreaInsets();
  const [walletName, setWalletName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isVisible) {
      setWalletName("");
      setInitialBalance("");
      setError("");
      setIsSaving(false);
    }
  }, [isVisible]);

  const handleClose = () => {
    if (!isSaving) {
      onClose();
    }
  };

  const handleSave = async () => {
    if (isSaving) return;

    const trimmedName = walletName.trim();
    const trimmedBalance = initialBalance.trim();
    const parsedBalance = Number.parseFloat(trimmedBalance);

    if (!trimmedName) {
      setError("Enter a wallet name to continue.");
      return;
    }

    if (!trimmedBalance || Number.isNaN(parsedBalance)) {
      setError("Enter a valid starting balance.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      const wallet = await createWallet(trimmedName, trimmedBalance);
      onCreated && onCreated(wallet);
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.vOverlay}>
        <Pressable
          accessibilityLabel="Close add wallet sheet"
          accessibilityRole="button"
          disabled={isSaving}
          onPress={handleClose}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={[
            styles.vDialog,
            { paddingBottom: Math.max(insets.bottom, 20) },
          ]}
        >
          <View style={styles.headerRow}>
            <View style={styles.titleGroup}>
              <Text style={styles.title}>Add Wallet</Text>
              <Text style={styles.subtitle}>
                Add another place to track your money.
              </Text>
            </View>
            <Pressable
              accessibilityLabel="Close add wallet sheet"
              accessibilityRole="button"
              hitSlop={8}
              onPress={handleClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
            >
              <Ionicons name="close" size={20} color="#8c4b54" />
            </Pressable>
          </View>

          <View style={styles.form}>
            <InputField
              icon="wallet-outline"
              placeholder="Wallet name"
              setValue={setWalletName}
              value={walletName}
            />
            <InputField
              icon="cash-outline"
              keyboardType="decimal-pad"
              placeholder="Starting balance"
              setValue={setInitialBalance}
              value={initialBalance}
            />
            <ErrorBanner message={error} />
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              disabled={isSaving}
              onPress={handleClose}
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && !isSaving && styles.cancelButtonPressed,
              ]}
            >
              <Text style={styles.cancelLabel}>Cancel</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              disabled={isSaving}
              onPress={handleSave}
              style={({ pressed }) => [
                styles.saveButton,
                isSaving && styles.saveButtonDisabled,
                pressed && !isSaving && styles.saveButtonPressed,
              ]}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={18} color="#fff" />
                  <Text style={styles.saveLabel}>Save Wallet</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  vOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  vDialog: {
    width: "100%",
    padding: 24,
    borderRadius: 18,
    backgroundColor: "#fffbf7",
    shadowColor: "#3f2226",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  titleGroup: {
    flex: 1,
  },
  title: {
    color: "#3f2226",
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    lineHeight: 30,
  },
  subtitle: {
    marginTop: 3,
    color: "#8c4b54",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#f7e3e5",
  },
  closeButtonPressed: {
    opacity: 0.68,
    transform: [{ scale: 0.96 }],
  },
  form: {
    marginTop: 18,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0cbd0",
    backgroundColor: "#fffaf8",
  },
  cancelButtonPressed: {
    opacity: 0.68,
    transform: [{ scale: 0.98 }],
  },
  cancelLabel: {
    color: "#8c4b54",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
  saveButton: {
    flex: 1.25,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#c94f61",
    backgroundColor: "#d75d69",
    shadowColor: "#8c4b54",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveLabel: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 18,
  },
});
