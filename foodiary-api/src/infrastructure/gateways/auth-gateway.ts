import { format } from "node:util";

import { InitiateAuthCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

import { Injectable } from "@/core/decorators/injectable";
import { cognitoClient } from "@/infrastructure/clients/cognito-client";
import { AppConfig } from "@/shared/config/app-config";

@Injectable()
export class AuthGateway {
  constructor(private readonly appConfig: AppConfig) {}

  public async signUp({
    email,
    password,
  }: AuthGateway.SignUpParams): Promise<AuthGateway.SignUpResult> {
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

  public async signIn({
    email,
    password,
  }: AuthGateway.SignInParams): Promise<AuthGateway.SignInResult> {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: this.appConfig.auth.cognito.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const { AuthenticationResult } = await cognitoClient.send(command);

    if (!AuthenticationResult?.AccessToken || !AuthenticationResult?.RefreshToken) {
      throw new Error(format("Failed to sign in user with email %s", email));
    }

    const { AccessToken: accessToken, RefreshToken: refreshToken } = AuthenticationResult;

    return {
      accessToken,
      refreshToken,
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

  export type SignInParams = {
    email: string;
    password: string;
  };

  export type SignInResult = {
    accessToken: string;
    refreshToken: string;
  };
}
