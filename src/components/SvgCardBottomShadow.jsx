import { useId } from "react";
import { StyleSheet, View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Mask,
  Path,
  Stop,
} from "react-native-svg";

const SHADOW_PATH =
  "M4 0 H96 Q100 0 100 4 V7 Q100 15 85 15 H15 Q0 15 0 7 V4 Q0 0 4 0 Z";

const SvgCardBottomShadow = ({
  children,
  color = "rgba(215, 93, 105, 0.2)",
  style,
  contentStyle,
  shadowStyle,
}) => {
  const shadowId = useId().replace(/:/g, "");
  const horizontalGradientId = `card-shadow-${shadowId}`;
  const verticalGradientId = `card-shadow-fade-${shadowId}`;
  const verticalMaskId = `card-shadow-mask-${shadowId}`;

  return (
    <View style={[styles.wrapper, style]}>
      <Svg
        style={[styles.shadow, shadowStyle]}
        viewBox="0 0 100 15"
        preserveAspectRatio="none"
        pointerEvents="none"
      >
        <Defs>
          <LinearGradient id={horizontalGradientId} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={color} stopOpacity="0" />
            <Stop offset="0.18" stopColor={color} stopOpacity="0.7" />
            <Stop offset="0.5" stopColor={color} stopOpacity="1" />
            <Stop offset="0.82" stopColor={color} stopOpacity="0.7" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>

          <LinearGradient id={verticalGradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#fff" stopOpacity="0.82" />
            <Stop offset="0.52" stopColor="#fff" stopOpacity="0.58" />
            <Stop offset="1" stopColor="#fff" stopOpacity="0" />
          </LinearGradient>

          <Mask
            id={verticalMaskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="100"
            height="15"
          >
            <Path d={SHADOW_PATH} fill={`url(#${verticalGradientId})`} />
          </Mask>
        </Defs>

        <Path
          d={SHADOW_PATH}
          fill={`url(#${horizontalGradientId})`}
          mask={`url(#${verticalMaskId})`}
        />
      </Svg>

      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
};

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
    transform: [{ scaleX: 0.98 }],
  },
  content: {
    zIndex: 1,
  },
});

export default SvgCardBottomShadow;
