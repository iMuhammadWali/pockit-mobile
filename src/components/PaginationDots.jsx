import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";

const PaginationDots = ({ totalSteps = 3, currentStep = 0 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep;

        // Animated value for dot width (active is 24, inactive is 8)
        const widthAnim = useRef(new Animated.Value(isActive ? 24 : 8)).current;
        // Animated value for color interpolation (0 = grey, 1 = pink)
        const colorAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

        useEffect(() => {
          Animated.parallel([
            Animated.timing(widthAnim, {
              toValue: isActive ? 24 : 8,
              duration: 300,
              useNativeDriver: false, // layout property animations must run on JS thread
            }),
            Animated.timing(colorAnim, {
              toValue: isActive ? 1 : 0,
              duration: 300,
              useNativeDriver: false, // color interpolation must run on JS thread
            }),
          ]).start();
        }, [isActive]);

        const backgroundColor = colorAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["#cccccc", "#ff9999"],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: widthAnim,
                backgroundColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default PaginationDots;
