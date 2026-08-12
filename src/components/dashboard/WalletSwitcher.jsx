import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

const WalletSwitcher = ({ wallets, activeWallet, onChange }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.scroll}
    contentContainerStyle={styles.row}
  >
    {wallets.map((wallet) => {
      const isActive = wallet === activeWallet;

      return (
        <Pressable
          key={wallet}
          onPress={() => onChange(wallet)}
          accessibilityRole="button"
          accessibilityState={{ selected: isActive }}
          style={[styles.chip, isActive && styles.activeChip]}
        >
          <Text style={[styles.label, isActive && styles.activeLabel]}>
            {wallet}
          </Text>
        </Pressable>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  row: {
    gap: 8,
    alignItems: "center",
  },
  chip: {
    borderWidth: 1,
    borderColor: "#d75d69",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf7f0",
  },
  activeChip: {
    backgroundColor: "#d75d69",
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#d75d69",
  },
  activeLabel: {
    color: "#fff",
  },
});

export default WalletSwitcher;
