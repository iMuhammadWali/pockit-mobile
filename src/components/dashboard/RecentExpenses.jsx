import { Pressable, StyleSheet, Text, View } from "react-native";
import SingleExpenseItem from "../SingleExpenseItem";

const RecentExpenses = ({ expenses, walletName, onSeeAll, limit = 4 }) => {
  const recentExpenses = expenses.slice(0, limit);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Recent Expenses</Text>
        <Pressable onPress={onSeeAll} accessibilityRole="button" hitSlop={8}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <View style={styles.listContent}>
        {recentExpenses.map((expense) => (
          <SingleExpenseItem
            key={expense.id}
            item={expense}
            walletName={walletName}
          />
        ))}

        {recentExpenses.length === 0 && (
          <Text style={styles.emptyText}>No expenses yet.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  seeAll: {
    color: "#d75d69",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 10,
    marginTop: 5,
  },
  emptyText: {
    paddingVertical: 18,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#8c746e",
  },
});

export default RecentExpenses;
