import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { Platform, Pressable, View } from "react-native";

import type { AppStackNavigationProps } from "@/app/navigation/app-stack";
import type { SimplifiedMeal } from "@/app/types/meal";

import { AppText } from "@/ui/components/app-text";
import { useHomeContext } from "@/ui/screens/home/context/use-home-context";
import { theme } from "@/ui/styles/theme";

import { calculateMealMacros } from "@/shared/functions/calculate-meal-macros";

import { styles } from "./styles";

type MealCardProps = {
  meal: SimplifiedMeal;
};

export function MealCard({ meal }: MealCardProps) {
  const { isFetching } = useHomeContext();
  const { navigate } = useNavigation<AppStackNavigationProps>();

  const formattedFoods = useMemo(
    () => meal.foods.map((food) => food.name).join(", "),
    [meal.foods],
  );

  const macros = useMemo(() => calculateMealMacros(meal.foods), [meal.foods]);

  return (
    <View style={[styles.container, { opacity: isFetching ? 0.5 : 1 }]}>
      <AppText color={theme.colors.gray[700]}>{formatTime(meal.createdAt)}</AppText>

      <View style={styles.wrapper}>
        <Pressable
          onPress={() => navigate("MealDetails", { mealId: meal.id })}
          disabled={isFetching}
          android_ripple={{ color: "rgba(0, 0, 0, 0.1)", foreground: true }}
          style={({ pressed }) => [
            styles.card,
            pressed && Platform.OS === "ios" && { opacity: 0.5 },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.icon}>
              <AppText>{meal.icon}</AppText>
            </View>

            <View style={styles.mealDetails}>
              <AppText color={theme.colors.gray[700]} fontSize="sm" numberOfLines={1}>
                {meal.name}
              </AppText>
              <AppText weight="medium" numberOfLines={1}>
                {formattedFoods}
              </AppText>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.mealStatsRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.tomato} weight="medium">
                  {macros.calories}
                </AppText>
                <AppText color={theme.colors.gray[700]}>Kcal</AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.teal} weight="medium">
                  {macros.proteins.grams}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
              </View>
            </View>

            <View style={styles.mealStatsRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.yellow} weight="medium">
                  {macros.carbohydrates.grams}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.orange} weight="medium">
                  {macros.fats.grams}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}h${minutes}`;
}
