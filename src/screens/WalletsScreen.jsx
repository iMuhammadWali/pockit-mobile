import { useEffect, useState } from "react";
import { getAllWallets } from "../api/wallet";
import WalletCard from "../components/WalletScreen/WalletCard";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import ErrorBanner from "../components/ErrorBanner";
import Header from "../components/Header";
import GreetingHeader from "../components/GreetingHeader";

import KeyboardAwareLayout from "../components/KeyboardAwareLayout";

const WalletsScreen = () => {
  // This needs to fetch all the wallets and show them.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    let ignore = false;
    const loadWallets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getAllWallets();
        if (ignore) return;

        setWallets(result.wallets);
      } catch (err) {
        if (ignore) return;

        setError(err.message);
      } finally {
        if (ignore) return;
        setIsLoading(false);
      }
    };
    loadWallets();
    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  const renderWallets = () => {
    return wallets.map((wallet) => (
      <WalletCard key={wallet._id} wallet={wallet} />
    ));
  };

  return (
    <KeyboardAwareLayout header={  <Header pageName="Wallets" />}>
      <View style={styles.container}>
      
        {renderWallets()}

        <ErrorBanner message={error} />
      </View>
    </KeyboardAwareLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
});

export default WalletsScreen;
