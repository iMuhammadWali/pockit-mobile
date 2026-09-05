import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const DashboardHeader = ({ name = "Wali" }) => (
  <View style={styles.header}>
    <View style={styles.textRow}>
      <Text style={styles.greeting}>Hi,</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.sparkleBadge}>
        <Ionicons name="sparkles" size={14} color="#fff" />
      </View>
    </View>
    <LinearGradient
      colors={["rgba(215, 93, 105, 0.08)", "rgba(215, 93, 105, 0)"]}
      style={styles.bottomShadow}
      pointerEvents="none"
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 8,
    height: 50,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  bottomShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -7,
    height: 7,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  greeting: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    lineHeight: 24,
    color: "#7a2a35",
  },
  name: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    lineHeight: 32,
    color: "#d75d69",
    transform: [{ rotate: "-2deg" }],
  },
  sparkleBadge: {
    width: 22,
    height: 22,
    marginLeft: 4,
    borderRadius: 11,
    backgroundColor: "#a06cd5",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "10deg" }],
  },
});

export default DashboardHeader;
