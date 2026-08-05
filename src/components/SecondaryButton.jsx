import { ActivityIndicator, Pressable, Text, StyleSheet } from "react-native";

const SecondaryButton = ({ label, onPress, loading = false, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !loading && styles.pressedButton,
        style,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e6e3ea",
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  pressedButton: {
    backgroundColor: "#d8d5dc",
  },
  buttonText: {
    color: "#000000",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
});

export default SecondaryButton;
