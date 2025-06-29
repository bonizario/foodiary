import { Injectable } from "@/core/decorators/injectable";

@Injectable()
export class SignUpUseCase {
  public async execute(input: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    console.log("Executing SignUpUseCase with input:", input);

    return {
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    };
  }
}

export namespace SignUpUseCase {
  export interface Input {
    email: string;
    password: string;
  }

  export interface Output {
    accessToken: string;
    refreshToken: string;
  }
}
