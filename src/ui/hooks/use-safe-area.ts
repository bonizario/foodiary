import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useSafeArea() {
  const insets = useSafeAreaInsets();
  return {
    ...insets,
    top: Math.max(insets.top - (Platform.OS === "ios" ? 8 : 0), 0),
  };
}
