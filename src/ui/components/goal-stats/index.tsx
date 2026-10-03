import { useMemo } from "react";
import { View } from "react-native";

import { AppText } from "@/ui/components/app-text";
import { Arc } from "@/ui/components/goal-stats/arc";
import { styles } from "@/ui/components/goal-stats/styles";
import { theme } from "@/ui/styles/theme";

type MacroProgress = {
  goal: number;
  current?: number;
};

type GoalArcsProps = {
  calories: MacroProgress;
  proteins: MacroProgress;
  carbohydrates: MacroProgress;
  fats: MacroProgress;
};

export function GoalStats({ calories, carbohydrates, fats, proteins }: GoalArcsProps) {
  const percentages = useMemo(
    () => ({
      calories: calcMacroPercentage(calories),
      carbohydrates: calcMacroPercentage(carbohydrates),
      fats: calcMacroPercentage(fats),
      proteins: calcMacroPercentage(proteins),
    }),
    [calories, carbohydrates, fats, proteins],
  );

  return (
    <View style={styles.container}>
      <View style={styles.arcsContainer}>
        <Arc
          percentage={percentages.calories}
          color={theme.colors.support.tomato}
          radius={160}
          strokeWidth={12}
        />
        <Arc
          percentage={percentages.proteins}
          color={theme.colors.support.teal}
          radius={140}
          strokeWidth={12}
          style={styles.proteinArc}
        />
        <Arc
          percentage={percentages.carbohydrates}
          color={theme.colors.support.yellow}
          radius={120}
          strokeWidth={12}
          style={styles.carbohydrateArc}
        />
        <Arc
          percentage={percentages.fats}
          color={theme.colors.support.orange}
          radius={100}
          strokeWidth={12}
          style={styles.fatArc}
        />

        <View style={styles.caloriesTextContainer}>
          <AppText>
            <AppText weight="semibold" color={theme.colors.support.tomato} fontSize="xl">
              {formatMacro(calories)}
            </AppText>
            {calories.current !== undefined && (
              <AppText color={theme.colors.gray[700]}> / {calories.goal}</AppText>
            )}
          </AppText>

          <AppText
            align="center"
            color={theme.colors.gray[700]}
            fontSize="sm"
            style={styles.caloriesLabel}
          >
            Calorias
          </AppText>
        </View>
      </View>

      <View style={styles.macrosContainer}>
        <View style={styles.macroItem}>
          <AppText weight="semibold" color={theme.colors.support.teal}>
            {formatMacro(proteins)}g
            {proteins.current !== undefined && (
              <AppText fontSize="sm" color={theme.colors.gray[700]}>
                {" "}
                / {proteins.goal}g
              </AppText>
            )}
          </AppText>
          <AppText fontSize="sm" color={theme.colors.gray[700]}>
            Proteínas
          </AppText>
        </View>

        <View style={styles.macroItem}>
          <AppText weight="semibold" color={theme.colors.support.yellow}>
            {formatMacro(carbohydrates)}g
            {carbohydrates.current !== undefined && (
              <AppText fontSize="sm" color={theme.colors.gray[700]}>
                {" "}
                / {carbohydrates.goal}g
              </AppText>
            )}
          </AppText>
          <AppText fontSize="sm" color={theme.colors.gray[700]}>
            Carboidratos
          </AppText>
        </View>

        <View style={styles.macroItem}>
          <AppText weight="semibold" color={theme.colors.support.orange}>
            {formatMacro(fats)}g
            {fats.current !== undefined && (
              <AppText fontSize="sm" color={theme.colors.gray[700]}>
                {" "}
                / {fats.goal}g
              </AppText>
            )}
          </AppText>
          <AppText fontSize="sm" color={theme.colors.gray[700]}>
            Gorduras
          </AppText>
        </View>
      </View>
    </View>
  );
}

function calcMacroPercentage({ goal, current }: MacroProgress) {
  if (current === undefined) {
    return 100;
  }

  const percentage = (current / goal) * 100;

  return Math.min(percentage, 100);
}

function formatMacro({ goal, current }: MacroProgress) {
  return current !== undefined ? Math.round(current) : goal;
}
