import { LinearGradient } from "expo-linear-gradient";
import { useState, type ReactNode } from "react";
import { StyleSheet, View, type DimensionValue, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { theme } from "@/ui/styles/theme";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const colorModes = {
  light: {
    backgroundColor: theme.colors.gray[400],
    highlightColor: theme.colors.gray[200],
  },
  dark: {
    backgroundColor: theme.colors.gray[700],
    highlightColor: theme.colors.gray[600],
  },
} as const;

type SkeletonProps = {
  isLoading?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
  colorMode?: keyof typeof colorModes;
  style?: ViewStyle;
  children?: ReactNode;
};

export function Skeleton({
  isLoading = true,
  width = "100%",
  height = 24,
  radius = 8,
  colorMode = "light",
  style,
  children,
}: SkeletonProps) {
  const { backgroundColor, highlightColor } = colorModes[colorMode];
  const [boxWidth, setBoxWidth] = useState(0);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (!isLoading) {
    return children;
  }

  return (
    <View
      style={[{ width, height, borderRadius: radius, backgroundColor, overflow: "hidden" }, style]}
      onLayout={({ nativeEvent }) => {
        const nextWidth = nativeEvent.layout.width;
        if (nextWidth !== boxWidth) {
          setBoxWidth(nextWidth);
          translateX.value = -nextWidth;
          translateX.value = withRepeat(
            withTiming(nextWidth, { duration: 1200, easing: Easing.linear }),
            -1,
          );
        }
      }}
    >
      {boxWidth > 0 && (
        <AnimatedGradient
          colors={[backgroundColor, highlightColor, backgroundColor]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[StyleSheet.absoluteFill, { width: boxWidth }, animatedStyle]}
        />
      )}
    </View>
  );
}
