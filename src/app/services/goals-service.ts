import { Service } from "./service";

export class GoalsService extends Service {
  public static async updateGoals(payload: GoalsService.UpdateGoalsPayload): Promise<void> {
    await this.client.put<void>("/goals", payload);
  }
}

export namespace GoalsService {
  export type UpdateGoalsPayload = {
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  };
}
