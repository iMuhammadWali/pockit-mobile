import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const WalletCard = ({ wallet }) => {
  const balance = Number(wallet?.balance ?? 0);
  const formattedBalance = Number.isFinite(balance)
    ? balance.toLocaleString("en-PK", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    : "0";

  return (
    <View style={styles.cardShadow}>
      <View
        style={styles.card}
        accessible
        accessibilityLabel={`${wallet?.name ?? "Wallet"}, balance PKR ${formattedBalance}`}
      >
        <View style={styles.decorativeCircleLarge} />
        <View style={styles.decorativeCircleSmall} />

        <View style={styles.headerRow}>
          <View style={styles.iconBadge}>
            <Ionicons name="wallet-outline" size={20} color="#fff" />
          </View>

          <View style={styles.nameGroup}>
            <Text style={styles.walletName} numberOfLines={1}>
              {wallet?.name || "Untitled wallet"}
            </Text>
            <Text style={styles.balanceLabel}>Available balance</Text>
          </View>
        </View>

        <View style={styles.stitchLine} />

        <View style={styles.amountRow}>
          <Text style={styles.currency}>PKR</Text>
          <Text style={styles.balance} numberOfLines={1} adjustsFontSizeToFit>
            {formattedBalance}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    width: "100%",
    marginBottom: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#f7e3e5",
  },
  card: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: "#f7e3e5",
    borderWidth: 1,
    borderColor: "#f0cbd0",
    overflow: "hidden",
  },
  decorativeCircleLarge: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    right: -58,
    top: -72,
    backgroundColor: "#efc5cb",
  },
  decorativeCircleSmall: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 36,
    right: 34,
    top: -38,
    backgroundColor: "#fbeff0",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d75d69",
    transform: [{ rotate: "-4deg" }],
  },
  nameGroup: {
    flex: 1,
    marginLeft: 12,
  },
  walletName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 21,
    color: "#3f2226",
  },
  balanceLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#8c4b54",
  },
  stitchLine: {
    marginVertical: 9,
    borderTopWidth: 1,
    width: "70%",
    borderStyle: "dashed",
    borderColor: "#dcaeb4",
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    paddingLeft: 52,
  },
  currency: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "#d75d69",
  },
  balance: {
    fontFamily: "Poppins_700Bold",
    flexShrink: 1,
    fontSize: 22,
    lineHeight: 28,
    color: "#3f2226",
  },
});

export default WalletCard;
