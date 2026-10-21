import type { Meal, SimplifiedMeal } from "@/app/types/meal";

import { toLocalDateString } from "@/shared/functions/to-local-date-string";

import { Service } from "./service";

export class MealsService extends Service {
  public static getById = async (mealId: string): Promise<MealsService.GetByIdResponse> => {
    const { data } = await this.client.get<MealsService.GetByIdResponse>(`/meals/${mealId}`);

    return {
      meal: {
        ...data.meal,
        createdAt: new Date(data.meal.createdAt),
      },
    };
  };

  public static listByDate = async (date: Date): Promise<MealsService.ListByDateResponse> => {
    const { data } = await this.client.get<MealsService.ListByDateResponse>("/meals", {
      params: {
        date: toLocalDateString(date),
      },
    });

    return {
      meals: data.meals.map((meal) => ({ ...meal, createdAt: new Date(meal.createdAt) })),
    };
  };

  public static create = async (
    payload: MealsService.CreatePayload,
  ): Promise<MealsService.CreateResponse> => {
    const { data } = await this.client.post<{ mealId: string; uploadSignature: string }>(
      "/meals",
      payload,
    );

    await this.uploadPresignedPost({
      uploadSignature: data.uploadSignature,
      file: {
        name: payload.file.name,
        type: payload.file.type,
        uri: payload.file.uri,
      },
    });

    return {
      mealId: data.mealId,
    };
  };
}

export namespace MealsService {
  export type GetByIdResponse = {
    meal: Meal;
  };

  export type ListByDateResponse = {
    meals: SimplifiedMeal[];
  };

  export type CreatePayload = {
    file: {
      name: string;
      size: number;
      type: "audio/m4a" | "image/jpeg";
      uri: string;
    };
    timeZone: string;
  };

  export type CreateResponse = {
    mealId: string;
  };
}
