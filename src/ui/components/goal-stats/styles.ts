import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  arcsContainer: {
    alignItems: "center",
    position: "relative",
    minHeight: 172,
  },
  proteinArc: {
    position: "absolute",
    top: 20,
  },
  carbohydrateArc: {
    position: "absolute",
    top: 40,
  },
  fatArc: {
    position: "absolute",
    top: 60,
  },
  caloriesTextContainer: {
    marginTop: -64,
    alignItems: "center",
    justifyContent: "center",
  },
  caloriesLabel: {
    marginTop: 4,
  },
  macrosContainer: {
    padding: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  macroItem: {
    alignItems: "center",
    width: "33.333%",
    justifyContent: "center",
  },
});
