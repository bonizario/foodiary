import { Injectable } from "@/core/decorators/injectable";
import { AuthGateway } from "@/infrastructure/gateways/auth-gateway";

@Injectable()
export class SignUpUseCase {
  constructor(private readonly authGateway: AuthGateway) {}

  public async execute(input: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const { email, password } = input;

    await this.authGateway.signUp({ email, password });

    return {
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    };
  }
}

export namespace SignUpUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
