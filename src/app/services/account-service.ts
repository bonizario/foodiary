import type { BiologicalSex } from "@/app/types/biological-sex";
import type { Goal } from "@/app/types/goal";

import { parseLocalDateString } from "@/shared/functions/parse-local-date-string";

import { Service } from "./service";

export class AccountService extends Service {
  public static getMe = async (): Promise<AccountService.GetMeResponse> => {
    const { data } = await this.client.get<AccountService.GetMeResponse>("/me");

    return {
      ...data,
      profile: {
        ...data.profile,
        birthdate: parseLocalDateString(data.profile.birthdate),
      },
    };
  };
}

export namespace AccountService {
  export type GetMeResponse = {
    profile: {
      name: string;
      birthdate: Date;
      biologicalSex: BiologicalSex;
      height: number;
      weight: number;
      goal: Goal;
    };
    goal: {
      calories: number;
      carbohydrates: number;
      fats: number;
      proteins: number;
    };
  };
}
