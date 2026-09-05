import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = ({ pageName }) => {
  return (
    <View style={styles.vHeader}>
      <View style={styles.vTextRow}>
        <View style={styles.vSparkleBadge}>
          <Ionicons name="sparkles" size={14} color="#fff" />
        </View>
        <Text style={styles.tvName}>{pageName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vHeader: {
    backgroundColor: "#fff",    
    paddingTop: 10,
    height: 50,
    paddingLeft: 20
  },
  vTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tvName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    lineHeight: 32,
    color: "#d75d69",
    transform: [{ rotate: "2deg" }],
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

export default Header;
