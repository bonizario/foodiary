import { Injectable } from "@/core/decorators/injectable";
import { env } from "@/shared/config/env";

@Injectable()
export class AppConfig {
  public readonly auth: AppConfig.Auth;

  constructor() {
    this.auth = {
      cognito: {
        clientId: env.COGNITO_CLIENT_ID,
      },
    };
  }
}

export namespace AppConfig {
  export type Auth = {
    cognito: {
      clientId: string;
    };
  };
}
