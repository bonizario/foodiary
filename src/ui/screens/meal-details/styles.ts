import { StyleSheet } from "react-native";

import { theme } from "@/ui/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  food: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  separator: {
    marginHorizontal: 20,
    height: 1,
    backgroundColor: theme.colors.gray[400],
  },
});
