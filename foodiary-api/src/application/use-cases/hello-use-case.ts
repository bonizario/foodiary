export class HelloUseCase {
  public async execute(input: HelloUseCase.Input): Promise<HelloUseCase.Output> {
    return {
      message: `Hello, ${input.email}!`,
    };
  }
}

export namespace HelloUseCase {
  export interface Input {
    email: string;
  }

  export interface Output {
    message: string;
  }
}
