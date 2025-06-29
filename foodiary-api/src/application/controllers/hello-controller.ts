import { z } from "zod";

import { Controller } from "@/application/contracts/controller";
import { HelloUseCase } from "@/application/use-cases/hello-use-case";
import { Injectable } from "@/core/decorators/injectable";
import { Schema } from "@/core/decorators/schema";

const schema = z.object({
  name: z.string({ errorMap: () => ({ message: "Name is required" }) }).min(1),
  email: z.string({ errorMap: () => ({ message: "Email must be a valid email address" }) }).email(),
});

type Body = z.output<typeof schema>;

@Injectable()
@Schema(schema)
export class HelloController extends Controller<unknown> {
  constructor(private readonly helloUseCase: HelloUseCase) {
    super();
  }

  protected override async handle(
    request: Controller.Request<Body>,
  ): Promise<Controller.Response<unknown>> {
    const { message } = await this.helloUseCase.execute({
      email: request.body.email,
    });

    return {
      statusCode: 200,
      body: {
        message,
      },
    };
  }
}
