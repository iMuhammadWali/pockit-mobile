import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACTIVE_COLOR = "#c94f61";
const INACTIVE_COLOR = "#746b70";

const LiquidGlassTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.positioner, { paddingBottom: bottomInset }]}
    >
      <View style={styles.shadowShell}>
        <BlurView
          intensity={72}
          tint="systemUltraThinMaterialLight"
          experimentalBlurMethod="dimezisBlurView"
          style={styles.glass}
        >
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0.24)",
              "rgba(255, 238, 241, 0.12)",
            ]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const label =
              options.tabBarLabel ?? options.title ?? route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}
                accessibilityRole="tab"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                style={({ pressed }) => [
                  styles.tab,
                  isFocused && styles.activeTab,
                  pressed && styles.pressedTab,
                ]}
              >
                <View style={styles.iconSlot}>
                  {options.tabBarIcon?.({
                    focused: isFocused,
                    color,
                    size: 21,
                  })}
                </View>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.label,
                    { color },
                    isFocused && styles.activeLabel,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  positioner: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 8,  
  },
  shadowShell: {
    borderRadius: 33,
    backgroundColor: "transparent",
    shadowColor: "#8f5962",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 10,
  },
  glass: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.58)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    minWidth: 0,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26,
    paddingHorizontal: 2,
    gap: 2,
  },
  activeTab: {
    backgroundColor: "rgba(247, 211, 216, 0.42)",
  },
  pressedTab: {
    opacity: 0.68,
    transform: [{ scale: 0.96 }],
  },
  iconSlot: {
    height: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    maxWidth: "100%",
    fontFamily: "Poppins_500Medium",
    fontSize: 8,
    lineHeight: 11,
  },
  activeLabel: {
    fontFamily: "Poppins_600SemiBold",
  },
});

export default LiquidGlassTabBar;
