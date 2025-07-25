import { z } from "zod";

import { Controller } from "@/application/contracts/controller";
import { SignInUseCase } from "@/application/use-cases/auth/sign-in-use-case";
import { Injectable } from "@/core/decorators/injectable";
import { Schema } from "@/core/decorators/schema";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

type RequestBody = z.output<typeof schema>;

type ResponseBody = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
@Schema(schema)
export class SignInController extends Controller<"public", ResponseBody> {
  constructor(private readonly signInUseCase: SignInUseCase) {
    super();
  }

  protected override async handle(
    request: Controller.Request<"public", RequestBody>,
  ): Promise<Controller.Response<ResponseBody>> {
    const { accessToken, refreshToken } = await this.signInUseCase.execute({
      email: request.body.email,
      password: request.body.password,
    });

    return {
      statusCode: 200,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}
