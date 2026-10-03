import { StyleSheet } from "react-native";

import { theme } from "@/ui/styles/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginTop: -16,
    gap: 8,
  },
  divider: {
    backgroundColor: theme.colors.gray[200],
    width: "100%",
    height: 2,
    borderRadius: 1,
    marginTop: 12,
    marginBottom: 24,
  },
  mealsLabel: {
    letterSpacing: 1.28,
  },
});
