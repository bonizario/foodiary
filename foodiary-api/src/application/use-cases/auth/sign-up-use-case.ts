import { Account } from "@/application/entities/account";
import { Injectable } from "@/core/decorators/injectable";
import { AccountRepository } from "@/infrastructure/database/dynamo/repositories/account-repository";
import { AuthGateway } from "@/infrastructure/gateways/auth-gateway";

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly authGateway: AuthGateway,
  ) {}

  public async execute({ email, password }: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const { externalId } = await this.authGateway.signUp({ email, password });

    const account = new Account({ email, externalId });

    await this.accountRepository.create(account);

    const { accessToken, refreshToken } = await this.authGateway.signIn({ email, password });

    return {
      accessToken,
      refreshToken,
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
