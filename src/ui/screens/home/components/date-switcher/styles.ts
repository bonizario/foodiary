import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedDate: {
    textTransform: "uppercase",
    letterSpacing: 1.28, // 8% of 16px
  },
});
