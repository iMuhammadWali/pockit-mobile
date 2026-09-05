// React
import { useCallback, useState } from "react";

// React Native
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Icons
import Ionicons from "@expo/vector-icons/Ionicons";

// API
import { getAllWallets } from "../api/wallet";

// Layout
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";

// Components
import ErrorBanner from "../components/ErrorBanner";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NewWalletSheet from "../components/WalletScreen/NewWalletSheet";
import WalletCard from "../components/WalletScreen/WalletCard";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ExpenseSummary from "../components/ExpenseSummary";


const WalletsScreen = () => {
  // This needs to fetch all the wallets and show them.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewWalletSheetVisible, setIsNewWalletSheetVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [wallets, setWallets] = useState([]);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  // I will move this filter to backend, and then add a debouncing time.
  const filteredWallets = normalizedSearchQuery
    ? wallets.filter((wallet) =>
        wallet?.name?.toLowerCase().includes(normalizedSearchQuery),
      )
    : wallets;

  // TODO: Add ignore variable
  const loadWallets = async () => {
    setError(null);
    try {
      const result = await getAllWallets();
      setWallets(result.wallets ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  const renderWallets = () =>
    filteredWallets.map((wallet) => (
      <WalletCard key={wallet._id} wallet={wallet} />
    ));

  return (
    <KeyboardAwareLayout
      header={<Header pageName="Your Wallets" />}
      contentContainerStyle={styles.vContentContainer}
    >
      <NewWalletSheet
        isVisible={isNewWalletSheetVisible}
        onClose={() => setIsNewWalletSheetVisible(false)}
        onCreated={() => loadWallets(undefined, false)}
      />
            {/* <ConfirmationDialog
              isOpen={isNewWalletSheetVisible}
              title="Are you sure you want to save the following expense?"
              body={<ExpenseSummary expense={{

              }} />}
              confirmLabel="Save"
              onCancel={() => setIsNewWalletSheetVisible(false)}
              onConfirm={{}}
            /> */}

      <View style={styles.toolbar}>
        <SearchBar
          accessibilityLabel="Search wallets"
          onChangeText={setSearchQuery}
          placeholder="Search wallets"
          style={styles.toolbarSearch}
          value={searchQuery}
        />
        <Pressable
          onPress={() => setIsNewWalletSheetVisible(true)}
          style={({ pressed }) => [
            styles.addWalletButton,
            pressed && styles.addWalletButtonPressed,
          ]}
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.addWalletLabel} numberOfLines={1}>
            Add Wallet
          </Text>
        </Pressable>
      </View>

      {renderWallets()}

      {filteredWallets.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>
            {normalizedSearchQuery ? "No matching wallets" : "No wallets yet"}
          </Text>
        </View>
      )}

      <ErrorBanner message={error} />
    </KeyboardAwareLayout>
  );
};

const styles = StyleSheet.create({
  vContentContainer: {
    // paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  toolbarSearch: {
    flex: 1,
    minWidth: 0,
    marginBottom: 0,
  },
  addWalletButton: {
    minWidth: 126,
    height: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
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
  addWalletLabel: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 17,
  },
  addWalletButtonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.96 }],
  },
  emptyState: {
    minHeight: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: "#8c4b54",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
});

export default WalletsScreen;
