// React Native
import { Pressable, StyleSheet, TextInput, View } from "react-native";

// Icons
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SearchBar({
  value = "",
  onChangeText = () => {},
  placeholder = "Search",
  accessibilityLabel = placeholder,
  style,
}) {
  const hasValue = value.length > 0;

  return (
    <View style={[styles.searchBar, style]}>
      <Ionicons
        name="search-outline"
        size={19}
        color="#d75d69"
        style={styles.searchIcon}
      />
      <TextInput
        accessibilityLabel={accessibilityLabel}
        autoCapitalize="none"
        autoCorrect={false}
        cursorColor="#d75d69"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8c4b54"
        returnKeyType="search"
        style={styles.searchInput}
        value={value}
      />
      {hasValue && (
        <Pressable
          accessibilityLabel="Clear search"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => onChangeText("")}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.clearButtonPressed,
          ]}
        >
          <Ionicons name="close-circle" size={18} color="#b45b66" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
    height: 52,
    marginBottom: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0cbd0",
    backgroundColor: "#fffaf8",
    shadowColor: "#8c4b54",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    color: "#3f2226",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  clearButton: {
    width: 32,
    height: 32,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  clearButtonPressed: {
    opacity: 0.62,
    transform: [{ scale: 0.94 }],
  },
});
