import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TRANSPARENT = "rgba(255, 255, 255, 0)";

const CardBottomShadow = ({
  children,
  color = "rgba(215, 93, 105, 0.2)",
  style,
  contentStyle,
  shadowStyle,
}) => (
  <View style={[styles.wrapper, style]}>
    <LinearGradient
      colors={[TRANSPARENT, color, TRANSPARENT]}
      locations={[0, 0.5, 1]}
      style={[styles.shadow, shadowStyle]}
      pointerEvents="none"
    />
    <View style={[styles.content, contentStyle]}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginVertical: 3,
    paddingBottom: 4,
  },
  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -3,
    height: 15,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    transform: [{ scaleX: 0.98 }],
  },
  content: {
    zIndex: 1,
  },
});

export default CardBottomShadow;
