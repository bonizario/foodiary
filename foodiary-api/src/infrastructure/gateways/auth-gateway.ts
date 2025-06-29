import { format } from "node:util";

import { Injectable } from "@/core/decorators/injectable";
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "../clients/cognito-client";

@Injectable()
export class AuthGateway {
  async signUp(input: AuthGateway.SignUpParams): Promise<AuthGateway.SignUpResult> {
    const { email, password } = input;

    const command = new SignUpCommand({
      ClientId: "",
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
