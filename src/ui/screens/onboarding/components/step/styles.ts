import { StyleSheet } from "react-native";

import { theme } from "@/ui/styles/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  header: {
    gap: 8,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    letterSpacing: -0.32,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  contentScroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 16,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
  },
  contentCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
});
