import type { BiologicalSex } from "@/app/constants/biological-sex";
import { Service } from "@/app/services/service";

export class AccountsService extends Service {
  public static getMe = async (): Promise<AccountsService.GetMeResponse> => {
    const { data } = await this.client.get<AccountsService.GetMeResponse>("/me");

    return {
      ...data,
      profile: {
        ...data.profile,
        birthdate: new Date(data.profile.birthdate),
      },
    };
  };
}

export namespace AccountsService {
  export type GetMeResponse = {
    profile: {
      name: string;
      birthdate: Date;
      biologicalSex: BiologicalSex;
      height: number;
      weight: number;
    };
    goal: {
      calories: number;
      carbohydrates: number;
      fats: number;
      proteins: number;
    };
  };
}
