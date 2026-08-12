import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SvgCardBottomShadow from "../SvgCardBottomShadow";

const BalanceSpendCard = ({
  activeWallet,
  balance,
  month,
  spentFilter,
  totalSpent,
  onToggleSpentFilter,
}) => (
  <SvgCardBottomShadow color="rgba(215, 93, 105, 0.2)">
    <View style={styles.card}>
      <View style={styles.balanceArea}>
        <View style={styles.headingRow}>
          <Text style={styles.balanceLabel}>Total balance</Text>
          <Text style={styles.activeWallet} numberOfLines={1}>
            {activeWallet}
          </Text>
        </View>

        <View style={styles.balanceValueRow}>
          <Text style={styles.balanceCurrency}>PKR</Text>
          <Text style={styles.balanceValue} numberOfLines={1} adjustsFontSizeToFit>
            {balance.toLocaleString()}
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={["#f7e3e5", "#f5dfe2", "#f2d8dc"]}
        locations={[0, 0.35, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.sectionDivider} />
        <Pressable
          style={({ pressed }) => [
            styles.spentRow,
            pressed && styles.spentRowPressed,
          ]}
          onPress={onToggleSpentFilter}
          accessibilityRole="button"
          accessibilityLabel={`Show ${spentFilter === "Week" ? "monthly" : "weekly"} spending`}
        >
          <View style={styles.spentIcon}>
            <Ionicons name="calendar-outline" size={17} color="#d75d69" />
          </View>

          <View style={styles.spentCopy}>
            <View style={styles.spentTitleRow}>
              <Text style={styles.spentLabel}>{spentFilter} spending</Text>
              <Ionicons name="chevron-down" size={12} color="#8c4b54" />
            </View>
            <Text style={styles.spentPeriod}>{month || "Current period"}</Text>
          </View>

          <View style={styles.spentAmountGroup}>
            <Text style={styles.spentCurrency}>PKR</Text>
            <Text style={styles.spentValue} numberOfLines={1} adjustsFontSizeToFit>
              {totalSpent.toLocaleString()}
            </Text>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  </SvgCardBottomShadow>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f7e3e5",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e8c8ce",
  },
  balanceArea: {
    paddingHorizontal: 18,
    paddingTop: 15,
    paddingBottom: 13,
    backgroundColor: "transparent",
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  balanceLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#7a2a35",
  },
  activeWallet: {
    flexShrink: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    color: "#a04e59",
  },
  balanceValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 7,
    marginTop: 2,
  },
  balanceCurrency: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#d75d69",
  },
  balanceValue: {
    flexShrink: 1,
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    lineHeight: 36,
    color: "#3f2226",
  },
  spentRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 58,
    paddingHorizontal: 14,
    paddingVertical: 9,
    gap: 10,
    backgroundColor: "transparent",
  },
  sectionDivider: {
    height: 1,
    marginHorizontal: 14,
    backgroundColor: "#dfb8bf",
    opacity: 0.75,
  },
  spentRowPressed: {
    backgroundColor: "rgba(215, 93, 105, 0.08)",
  },
  spentIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbeff0",
  },
  spentCopy: {
    flex: 1,
  },
  spentTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  spentLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#3f2226",
  },
  spentPeriod: {
    fontFamily: "Poppins_400Regular",
    fontSize: 9,
    color: "#8c4b54",
  },
  spentAmountGroup: {
    maxWidth: "45%",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  spentCurrency: {
    fontFamily: "Poppins_500Medium",
    fontSize: 9,
    color: "#a04e59",
  },
  spentValue: {
    flexShrink: 1,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#3f2226",
  },
});

export default BalanceSpendCard;
