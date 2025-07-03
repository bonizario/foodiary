import { Injectable } from "@/core/decorators/injectable";
import { AuthGateway } from "@/infrastructure/gateways/auth-gateway";

@Injectable()
export class SignInUseCase {
  constructor(private readonly authGateway: AuthGateway) {}

  public async execute({ email, password }: SignInUseCase.Input): Promise<SignInUseCase.Output> {
    const { accessToken, refreshToken } = await this.authGateway.signIn({ email, password });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export namespace SignInUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
