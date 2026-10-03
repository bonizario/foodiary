import { StyleSheet } from "react-native";

import { theme } from "@/ui/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[400],
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
