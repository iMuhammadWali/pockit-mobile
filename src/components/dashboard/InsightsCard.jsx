import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SvgCardBottomShadow from "../SvgCardBottomShadow";

const InsightsCard = ({ onPress }) => (
  <SvgCardBottomShadow
    color="rgba(128, 101, 143, 0.2)"
    style={styles.shadowWrapper}
    contentStyle={styles.shadowContent}
  >
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="View insights from Pockit"
      hitSlop={6}
    >
      <View style={styles.iconBubble}>
        <MaterialCommunityIcons
          name="star-four-points-outline"
          size={19}
          color="#80658f"
        />
      </View>
      <Text style={styles.label}>View insights from Pockit</Text>
      <View style={styles.arrowBubble}>
        <Ionicons name="arrow-forward" size={15} color="#80658f" />
      </View>
    </Pressable>
  </SvgCardBottomShadow>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#e6e3ea",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d9d3df",
    padding: 10,
  },
  shadowWrapper: {
    flex: 1,
    minWidth: 0,
  },
  shadowContent: {
    flex: 1,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    lineHeight: 16,
    color: "#4f4257",
  },
  iconBubble: {
    width: 32,
    height: 32,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(255, 255, 255, 0.52)",
  },
  arrowBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.58)",
  },
});

export default InsightsCard;
