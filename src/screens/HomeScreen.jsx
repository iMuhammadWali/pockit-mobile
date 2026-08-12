import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BalanceSpendCard from "../components/dashboard/BalanceSpendCard";
import CategorySplitCard from "../components/dashboard/CategorySplitCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import InsightsCard from "../components/dashboard/InsightsCard";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import WalletSwitcher from "../components/dashboard/WalletSwitcher";
import useExpenses from "../hooks/useExpenses";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";

// TODO: Replace with real wallet data from context/API.
const WALLETS = [
  "All Wallets",
  "Cash",
  "Bank",
  "Savings",
  "Jazzcash",
  "Meezan Bank",
];

// TODO: Replace with real category totals computed from expenses.
const CATEGORY_DATA = [
  { value: 35, color: "#d75d69", label: "Food" },
  { value: 25, color: "#e39aa4", label: "Transport" },
  { value: 20, color: "#e6c3c9", label: "Bills" },
  { value: 12, color: "#e6e3ea", label: "Shopping" },
  { value: 8, color: "#e7f1f0", label: "Other" },
];

const HomeScreen = () => {
  const [month, setMonth] = useState("");
  const [totalSpent, setTotalSpent] = useState(0);
  const [balance, setBalance] = useState(0);
  const [spentFilter, setSpentFilter] = useState("Month");
  const [activeWallet, setActiveWallet] = useState("All Wallets");

  const navigator = useNavigation();
  const { expenses } = useExpenses();

  useEffect(() => {
    const date = new Date();
    setMonth(date.toLocaleString("default", { month: "short" }));
    setTotalSpent(expenses.reduce((sum, item) => sum + item.amount, 0));

    // TODO: Replace with real balance calculation for the selected wallet.
    setBalance(2450);
  }, [expenses, activeWallet, spentFilter]);

  const toggleSpentFilter = () => {
    setSpentFilter((previous) => (previous === "Week" ? "Month" : "Week"));
  };

  return (
    <KeyboardAwareLayout header={<DashboardHeader name="Wali" />}>
      <View style={styles.vContainer}>
        <WalletSwitcher
          wallets={WALLETS}
          activeWallet={activeWallet}
          onChange={setActiveWallet}
        />

        <BalanceSpendCard
          activeWallet={activeWallet}
          balance={balance}
          month={month}
          spentFilter={spentFilter}
          totalSpent={totalSpent}
          onToggleSpentFilter={toggleSpentFilter}
        />

        <View style={styles.overviewRow}>
          <CategorySplitCard data={CATEGORY_DATA} />
          <InsightsCard onPress={() => navigator.navigate("Insights")} />
        </View>

        <RecentExpenses
          expenses={expenses}
          walletName={activeWallet}
          onSeeAll={() => navigator.navigate("History")}
        />
      </View>
    </KeyboardAwareLayout>
  );
};

const styles = StyleSheet.create({
  vContainer: {
    paddingTop: 16,
    gap: 7
  },
  overviewRow: {
    flexDirection: "row",
    gap: 8,  
    overflow: "hidden"
  },
});

export default HomeScreen;
