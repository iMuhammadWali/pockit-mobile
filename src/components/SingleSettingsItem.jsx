import { View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SingleSettingsItem = ({ item}) => {
  return (
    <Pressable
      onPress={item.onPress ?? (() => {})}
      style={styles.container}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={20} color={item.iconColor} />
      </View>

      {/* Setting option */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingLeft: 5,
    paddingRight: 15,
    paddingVertical: 5,
    marginVertical: 5,
    gap: 12,
    elevation: 2,
    shadowColor: "#C4A882",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: "#fff",
  },
  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#000",
  },
});

export default SingleSettingsItem;
