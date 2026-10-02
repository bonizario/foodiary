import { create, isAxiosError } from "axios";

import { env } from "@/app/config/env";

export abstract class Service {
  private static refreshTokenInterceptorId: number | undefined;

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

  public static setAccessToken(accessToken: string): void {
    this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  public static removeAccessToken(): void {
    delete this.client.defaults.headers.common.Authorization;
  }

  public static removeRefreshTokenHandler(): void {
    if (this.refreshTokenInterceptorId !== undefined) {
      this.client.interceptors.response.eject(this.refreshTokenInterceptorId);
      this.refreshTokenInterceptorId = undefined;
    }
  }

  public static setRefreshTokenHandler(refreshHandler: () => Promise<void>): void {
    this.removeRefreshTokenHandler();

    this.refreshTokenInterceptorId = this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          !isAxiosError(error) ||
          error.response?.status !== 401 ||
          !error.config ||
          error.config.url === "/auth/refresh-token"
        ) {
          return Promise.reject(error);
        }
        await refreshHandler();
        return this.client(error.config);
      },
    );
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
}
