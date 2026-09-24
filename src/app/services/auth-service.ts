import { ActivityLevel } from "@/app/constants/activity-level";
import { BiologicalSex } from "@/app/constants/biological-sex";
import { Goal } from "@/app/constants/goal";
import { Service } from "@/app/services/service";

export class AuthService extends Service {
  public static async signIn(
    payload: AuthService.SignInPayload,
  ): Promise<AuthService.SignInResponse> {
    const { data } = await this.client.post<AuthService.SignInResponse>(
      "/auth/sign-in",
      payload,
    );

    return data;
  }

  public static async signUp(
    payload: AuthService.SignUpPayload,
  ): Promise<AuthService.SignUpResponse> {
    const { data } = await this.client.post<AuthService.SignUpResponse>(
      "/auth/sign-up",
      payload,
    );

    return data;
  }
}

export namespace AuthService {
  export type SignInPayload = {
    email: string;
    password: string;
  };

  export type SignInResponse = {
    accessToken: string;
    refreshToken: string;
  };

  export type SignUpPayload = {
    account: {
      email: string;
      password: string;
    };
    profile: {
      name: string;
      goal: Goal;
      biologicalSex: BiologicalSex;
      birthdate: Date;
      height: number;
      weight: number;
      activityLevel: ActivityLevel;
    };
  };

  export type SignUpResponse = {
    accessToken: string;
    refreshToken: string;
  };
}
