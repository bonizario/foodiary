import { z } from "zod";

import { Controller } from "@/application/contracts/controller";
import { SignUpUseCase } from "@/application/use-cases/auth/sign-up-use-case";
import { Injectable } from "@/core/decorators/injectable";
import { Schema } from "@/core/decorators/schema";

const schema = z.object({
  account: z.object({
    email: z.string({ errorMap: () => ({ message: "Invalid email" }) }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
      }),
  }),
});

type RequestBody = z.output<typeof schema>;

type ResponseBody = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
@Schema(schema)
export class SignUpController extends Controller<ResponseBody> {
  constructor(private readonly signUpUseCase: SignUpUseCase) {
    super();
  }

  protected override async handle(
    request: Controller.Request<RequestBody>,
  ): Promise<Controller.Response<ResponseBody>> {
    const { accessToken, refreshToken } = await this.signUpUseCase.execute(request.body.account);

    return {
      statusCode: 201,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}
