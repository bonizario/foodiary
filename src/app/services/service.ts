import { create } from "axios";

import { env } from "@/app/config/env";

export abstract class Service {
  protected static client = create({
    baseURL: env.api.url,
  });

  static {
    this.client.interceptors.response.use(async (response) => {
      if (__DEV__ && env.api.responseSleepMs) {
        await this.sleep(env.api.responseSleepMs);
      }

      return response;
    });
  }

  public static setAuthorizationHeader(accessToken: string): void {
    this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  public static removeAuthorizationHeader(): void {
    delete this.client.defaults.headers.common.Authorization;
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
}
