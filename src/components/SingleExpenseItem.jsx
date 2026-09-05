import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CardBottomShadow from "./CardBottomShadow";

const CATEGORY_CONFIG = {
  food: {
    icon: "fast-food-outline",
    surface: "#fff5f6",
    accent: "#c95668",
    border: "#fbedef",
    shadow: "rgba(217, 119, 132, 0.22)",
  },
  travel: {
    icon: "car-outline",
    surface: "#f4f9fb",
    accent: "#487c91",
    border: "#edf5f7",
    shadow: "rgba(117, 162, 176, 0.2)",
  },
  clothing: {
    icon: "shirt-outline",
    surface: "#f8f4fb",
    accent: "#8a5db8",
    border: "#f3edf8",
    shadow: "rgba(176, 135, 206, 0.19)",
  },
  health: {
    icon: "medkit-outline",
    surface: "#f3f9f6",
    accent: "#3f8167",
    border: "#edf5f1",
    shadow: "rgba(118, 171, 148, 0.2)",
  },
  other: {
    icon: "ellipsis-horizontal",
    surface: "#faf6f3",
    accent: "#8c6d5c",
    border: "#f6efeb",
    shadow: "rgba(174, 139, 121, 0.19)",
  },
};

const formatAmount = (value) => {
  const amount = Number(value ?? 0);

  return Number.isFinite(amount)
    ? amount.toLocaleString("en-PK", { maximumFractionDigits: 2 })
    : "0";
};

const formatDate = (value) => {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "No date"
    : date.toLocaleDateString("en-PK", {
        day: "2-digit",
        month: "short",
      });
};

const SingleExpenseItem = ({ item, walletName }) => {
  const category = item?.category?.toLowerCase() || "other";
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.other;
  const title = item?.title?.trim() || "Untitled expense";
  const amount = formatAmount(item?.amount);
  const date = formatDate(item?.createdAt);
  const expenseWallet =
    item?.walletName || item?.wallet?.name || walletName || "Wallet not assigned";

  return (
    <CardBottomShadow color={config.shadow}>
      <View
        style={[
          styles.container,
          { backgroundColor: config.surface, borderColor: config.border },
        ]}
        accessible
        accessibilityLabel={`${title}, ${category}, ${expenseWallet}, PKR ${amount}, ${date}`}
      >
        <View
          style={[
            styles.decorativeCircleFilled,
            { backgroundColor: config.accent },
          ]}
        />
        <View style={styles.decorativeCircleLight} />

        <View style={styles.iconWrapper}>
          <View
            style={[styles.iconContainer, { backgroundColor: config.accent }]}
          >
            <Ionicons name={config.icon} size={20} color="#fff" />
          </View>
          <View
            style={[
              styles.iconBubble,
              { backgroundColor: config.accent, borderColor: config.surface },
            ]}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <View style={styles.metadataRow}>
            <Text style={[styles.category, { color: config.accent }]}>
              {category}
            </Text>
            <View style={styles.metadataDot} />
            <Text style={styles.date}>{date}</Text>
            <View style={styles.metadataDot} />
            <Text style={styles.walletName} numberOfLines={1}>
              {expenseWallet}
            </Text>
          </View>
        </View>

        <View style={styles.amountGroup}>
          <Text style={[styles.currency, { color: config.accent }]}>PKR</Text>
          <Text style={styles.amount} numberOfLines={1} adjustsFontSizeToFit>
            -{amount}
          </Text>
        </View>
      </View>
    </CardBottomShadow>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 17,
    borderWidth: 1,
    overflow: "hidden",
    zIndex: 1,
  },
  decorativeCircleFilled: {
    position: "absolute",
    right: -48,
    top: -24,
    width: 116,
    height: 116,
    borderRadius: 58,
    opacity: 0.1,
  },
  decorativeCircleLight: {
    position: "absolute",
    right: 34,
    top: -20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  iconWrapper: {
    width: 46,
    height: 46,
    position: "relative",
    zIndex: 1,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-4deg" }],
  },
  iconBubble: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 3,
  },
  details: {
    flex: 1,
    minWidth: 0,
    zIndex: 1,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 20,
    color: "#3f2226",
    letterSpacing: -0.2,
  },
  metadataRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  category: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    textTransform: "capitalize",
  },
  metadataDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#c9aaa3",
  },
  date: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#8c746e",
  },
  walletName: {
    flexShrink: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#8c746e",
  },
  amountGroup: {
    maxWidth: "42%",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-end",
    gap: 4,
    zIndex: 1,
  },
  currency: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 9,
  },
  amount: {
    flexShrink: 1,
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    lineHeight: 20,
    color: "#d75d69",
    letterSpacing: -0.3,
  },
});

export default SingleExpenseItem;
