import type { BiologicalSex } from "@/app/types/biological-sex";

import { Service } from "./service";

export class ProfileService extends Service {
  public static async updateProfile(payload: ProfileService.UpdateProfilePayload): Promise<void> {
    await this.client.put<void>("/profiles", payload);
  }
}

export namespace ProfileService {
  export type UpdateProfilePayload = {
    name: string;
    birthdate: string;
    height: number;
    weight: number;
    biologicalSex: BiologicalSex;
  };
}
