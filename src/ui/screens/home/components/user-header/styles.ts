import { StyleSheet } from "react-native";

import { theme } from "@/ui/styles/theme";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 32,
    backgroundColor: theme.colors.lime[400],
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  greetings: {
    gap: 2,
  },
});
