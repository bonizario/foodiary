import { z } from "zod";

import { Controller } from "@/application/contracts/controller";
import { Schema } from "@/core/decorators/schema";

const schema = z.object({
  name: z.string({ errorMap: () => ({ message: "Name is required" }) }).min(1),
  email: z.string({ errorMap: () => ({ message: "Email must be a valid email address" }) }).email(),
});

type Body = z.output<typeof schema>;

@Schema(schema)
export class HelloController extends Controller<unknown> {
  protected override async handle(
    request: Controller.Request<Body>,
  ): Promise<Controller.Response<unknown>> {
    return {
      statusCode: 200,
      body: {
        parsedBody: request.body,
      },
    };
  }
}
