// Dashboard screen — refactored to match the agreed layout:
// Greeting -> Wallet Switcher -> Balance/Spent -> Category Split (pie) -> Recent Expenses -> Insights from Pockit

import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-gifted-charts";

import SingleExpenseItem from "../components/SingleExpenseItem";
import GreetingHeader from "../components/GreetingHeader";
import useExpenses from "../hooks/useExpenses";

import { useNavigation } from "@react-navigation/native";

// TODO: Replace with real wallet data from context/API.
const WALLETS = ["All Wallets", "Cash", "Bank", "Savings"];

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
  const [spentFilter, setSpentFilter] = useState("Month"); // TODO: swap for a proper dropdown/picker
  const [activeWallet, setActiveWallet] = useState("All Wallets");

  const navigator = useNavigation();

  // TODO: Fetch previous 7 days transaction totals and then use for the bar chart.
  const { expenses, isLoading, addExpense } = useExpenses();

  useEffect(() => {
    const date = new Date();
    const monthName = date.toLocaleString("default", { month: "short" });
    setMonth(monthName);

    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    setTotalSpent(total);

    // TODO: Replace with real balance calc (income - spend) per selected wallet.
    setBalance(2450);
  }, [expenses, activeWallet, spentFilter]);

  const toggleSpentFilter = () => {
    setSpentFilter((prev) => (prev === "Week" ? "Month" : "Week"));
  };

  return (
    <SafeAreaView style={styles.vContainer} edges={["top"]}>
      <StatusBar style="dark" />

      {/* Greeting */}
      <GreetingHeader name="Wali" />

      {/* Wallet Switcher */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.vWalletScroll}
        contentContainerStyle={styles.vWalletRow}
      >
        {WALLETS.map((wallet) => {
          const isActive = wallet === activeWallet;
          return (
            <Pressable
              key={wallet}
              onPress={() => setActiveWallet(wallet)}
              style={[styles.vWalletChip, isActive && styles.vWalletChipActive]}
            >
              <Text
                style={[
                  styles.tvWalletChipText,
                  isActive && styles.tvWalletChipTextActive,
                ]}
              >
                {wallet}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Balance + Spent card */}
      <View style={styles.vMoneyCard}>
        <Text style={styles.tvBalanceLabel}>Balance</Text>
        <Text style={styles.tvBalanceValue}>PKR {balance.toLocaleString()}</Text>

        <View style={styles.vSpentRow}>
          <Pressable style={styles.vSpentFilterPill} onPress={toggleSpentFilter}>
            <Text style={styles.tvSpentFilterText}>{spentFilter}</Text>
            <Ionicons name="chevron-down" size={12} color="#d75d69" />
          </Pressable>
          <Text style={styles.tvSpentLabel}>Spent - {month}</Text>
          <Text style={styles.tvSpentValue}>PKR {totalSpent}</Text>
        </View>
      </View>

      {/* Category Split */}
      <View style={styles.vCategoryCard}>
        <Text style={styles.tvSectionTitle}>Category Split</Text>
        <View style={styles.vCategoryContent}>
          <PieChart
            data={CATEGORY_DATA}
            radius={52}
            innerRadius={32}
            innerCircleColor="#f7e3e5"
          />
          <View style={styles.vLegend}>
            {CATEGORY_DATA.map((cat) => (
              <View key={cat.label} style={styles.vLegendRow}>
                <View
                  style={[styles.vLegendSwatch, { backgroundColor: cat.color }]}
                />
                <Text style={styles.tvLegendText}>
                  {cat.label} {cat.value}%
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Recent Expenses */}
      <View style={{ width: "100%", flex: 1 }}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <Text style={styles.tvRecentTitle}>Recent Expenses</Text>
          <Text
            style={styles.tvSeeAll}
            onPress={() => {
              navigator.navigate("History");
            }}
          >
            See all
          </Text>
        </View>
        <FlatList
          data={expenses}
          // TODO: SingleExpenseItem needs a `wallet` field per item to render the wallet tag.
          renderItem={SingleExpenseItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10, marginTop: 5 }}
        />
      </View>

      {/* Insights from Pockit */}
      <Pressable
        style={styles.vInsightsCard}
        onPress={() => navigator.navigate("Insights")}
      >
        <Text style={styles.tvInsightsText}>View insights from Pockit</Text>
        <Ionicons name="chevron-forward" size={18} color="#d75d69" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  vContainer: {
    flex: 1,
    backgroundColor: "#fdf7f0",
    paddingHorizontal: 20,
    gap: 16,
  },
  vWalletScroll: {
    flexGrow: 0,
  },
  vWalletRow: {
    gap: 8,
    alignItems: "center",
  },
  vWalletChip: {
    borderWidth: 1,
    borderColor: "#d75d69",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf7f0",
  },
  vWalletChipActive: {
    backgroundColor: "#d75d69",
  },
  tvWalletChipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#d75d69",
  },
  tvWalletChipTextActive: {
    color: "#fff",
  },
  vMoneyCard: {
    backgroundColor: "#f7e3e5",
    borderRadius: 20,
    elevation: 3,
    padding: 12,
  },
  tvBalanceLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#7a2a35",
  },
  tvBalanceValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#000",
    marginTop: 2,
    marginBottom: 6,
  },
  vSpentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  vSpentFilterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#d75d69",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tvSpentFilterText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#d75d69",
  },
  tvSpentLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#7a2a35",
    flex: 1,
  },
  tvSpentValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#000",
  },
  vCategoryCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
    padding: 12,
  },
  tvSectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  vCategoryContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  vLegend: {
    gap: 4,
  },
  vLegendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  vLegendSwatch: {
    width: 9,
    height: 9,
    borderRadius: 2,
  },
  tvLegendText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#000",
  },
  tvRecentTitle: {
    flex: 1,
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  tvSeeAll: {
    color: "#d75d69",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  vInsightsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e6e3ea",
    borderRadius: 20,
    elevation: 3,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 10,
  },
  tvInsightsText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#000",
  },
});

export default HomeScreen;