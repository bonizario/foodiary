import { StyleSheet } from "react-native";

import { theme } from "@/ui/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[900],
  },
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 36,
  },
  header: {
    alignItems: "center",
    gap: 24,
  },
  icon: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    backgroundColor: theme.colors.gray[200],
  },
  headerContent: {
    gap: 8,
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    maxWidth: 288,
    lineHeight: 32,
    letterSpacing: -0.32,
  },
  titleHighlight: {
    color: theme.colors.lime[500],
  },
  body: {
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 24,
  },
});
