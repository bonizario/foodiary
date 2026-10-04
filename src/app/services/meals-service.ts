import type { SimplifiedMeal } from "@/app/constants/meal";
import { Service } from "@/app/services/service";

import { toLocalDateString } from "@/shared/functions/to-local-date-string";

export class MealsService extends Service {
  public static getMealsByDate = async (
    date: Date,
  ): Promise<MealsService.GetMealsByDateResponse> => {
    const { data } = await this.client.get<MealsService.GetMealsByDateResponse>("/meals", {
      params: {
        date: toLocalDateString(date),
      },
    });

    return {
      meals: data.meals.map((meal) => ({ ...meal, createdAt: new Date(meal.createdAt) })),
    };
  };
}

export namespace MealsService {
  export type GetMealsByDateResponse = {
    meals: SimplifiedMeal[];
  };
}
