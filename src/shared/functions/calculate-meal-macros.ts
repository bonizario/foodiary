import type { Food } from "@/app/constants/meal";

const CALORIES_PER_GRAM = {
  proteins: 4,
  carbohydrates: 4,
  fats: 9,
} as const;

type MacroBreakdown = {
  grams: number;
  percentage: number;
};

type MealMacros = {
  calories: number;
  proteins: MacroBreakdown;
  carbohydrates: MacroBreakdown;
  fats: MacroBreakdown;
};

export function calculateMealMacros(foods: Food[] = []): MealMacros {
  const grams = foods.reduce(
    (acc, food) => ({
      proteins: acc.proteins + food.proteins,
      carbohydrates: acc.carbohydrates + food.carbohydrates,
      fats: acc.fats + food.fats,
    }),
    { proteins: 0, carbohydrates: 0, fats: 0 },
  );

  const calories = Math.round(
    grams.proteins * CALORIES_PER_GRAM.proteins +
      grams.carbohydrates * CALORIES_PER_GRAM.carbohydrates +
      grams.fats * CALORIES_PER_GRAM.fats,
  );

  const percentage = (macroGrams: number, caloriesPerGram: number) =>
    calories === 0 ? 0 : Math.round((macroGrams * caloriesPerGram * 100) / calories);

  return {
    calories,
    proteins: {
      grams: Math.round(grams.proteins * 100) / 100,
      percentage: percentage(grams.proteins, CALORIES_PER_GRAM.proteins),
    },
    carbohydrates: {
      grams: Math.round(grams.carbohydrates * 100) / 100,
      percentage: percentage(grams.carbohydrates, CALORIES_PER_GRAM.carbohydrates),
    },
    fats: {
      grams: Math.round(grams.fats * 100) / 100,
      percentage: percentage(grams.fats, CALORIES_PER_GRAM.fats),
    },
  };
}
