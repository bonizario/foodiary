import { format } from "node:util";

import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

import { Injectable } from "@/core/decorators/injectable";
import { cognitoClient } from "@/infrastructure/clients/cognito-client";
import { AppConfig } from "@/shared/config/app-config";

@Injectable()
export class AuthGateway {
  constructor(private readonly appConfig: AppConfig) {}

  async signUp(input: AuthGateway.SignUpParams): Promise<AuthGateway.SignUpResult> {
    const { email, password } = input;

    const command = new SignUpCommand({
      ClientId: this.appConfig.auth.cognito.clientId,
      Username: email,
      Password: password,
    });

    const { UserSub: externalId } = await cognitoClient.send(command);

    if (!externalId) {
      throw new Error(format("Failed to sign up user with email %s", email));
    }

    return {
      externalId,
    };
  }
}

export namespace AuthGateway {
  export type SignUpParams = {
    email: string;
    password: string;
  };

  export type SignUpResult = {
    externalId: string;
  };
}
