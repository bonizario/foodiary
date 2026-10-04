import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { Platform, Pressable, View } from "react-native";

import type { SimplifiedMeal } from "@/app/constants/meal";
import type { AppStackNavigationProps } from "@/app/navigation/app-stack";

import { AppText } from "@/ui/components/app-text";
import { styles } from "@/ui/screens/home/components/meal-card/styles";
import { useHomeContext } from "@/ui/screens/home/context/use-home-context";
import { theme } from "@/ui/styles/theme";

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

  const summary = useMemo(
    () =>
      (meal.foods ?? []).reduce(
        (acc, food) => {
          const proteinsCalories = food.proteins * 4;
          const carbohydratesCalories = food.carbohydrates * 4;
          const fatsCalories = food.fats * 9;
          const totalCalories = Math.round(proteinsCalories + carbohydratesCalories + fatsCalories);

          return {
            calories: acc.calories + totalCalories,
            proteins: acc.proteins + food.proteins,
            carbohydrates: acc.carbohydrates + food.carbohydrates,
            fats: acc.fats + food.fats,
          };
        },
        { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
      ),
    [meal.foods],
  );

  return (
    <View style={[styles.container, { opacity: isFetching ? 0.5 : 1 }]}>
      <AppText color={theme.colors.gray[700]}>{formatTime(meal.createdAt)}</AppText>

      <View style={styles.wrapper}>
        <Pressable
          // onPress={() => navigate("MealDetails", { mealId: meal.id })}
          onPress={() => {}}
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
                  {formatStat(summary.calories)}
                </AppText>
                <AppText color={theme.colors.gray[700]}>Kcal</AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.teal} weight="medium">
                  {formatStat(summary.proteins)}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
              </View>
            </View>

            <View style={styles.mealStatsRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.yellow} weight="medium">
                  {formatStat(summary.carbohydrates)}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.orange} weight="medium">
                  {formatStat(summary.fats)}g
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

function formatStat(value: number) {
  return Math.round(value * 100) / 100;
}
