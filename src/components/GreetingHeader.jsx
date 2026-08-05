import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GreetingHeader = ({ name = "Wali" }) => {
  return (
    <View style={styles.vHeader}>

      <View style={styles.vTextRow}>
        <Text style={styles.tvHi}>Hi,</Text>
        <Text style={styles.tvName}>{name}</Text>
        <View style={styles.vSparkleBadge}>
          <Ionicons name="sparkles" size={14} color="#fff" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vHeader: {
    // paddingVertical: 2,
    paddingTop: 10
  },
  vTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tvHi: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    lineHeight: 24,
    color: "#7a2a35",
  },
  tvName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    lineHeight: 32,
    color: "#d75d69",
    transform: [{ rotate: "-2deg" }],
  },
  vSparkleBadge: {
    marginLeft: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#a06cd5",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "10deg" }],
  },
  tvSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#7a2a35",
    marginTop: 2,
    marginLeft: 2,
  },
});

export default GreetingHeader;