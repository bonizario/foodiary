import "reflect-metadata";

import { HelloController } from "@/application/controllers/hello-controller";
import { container } from "@/core/di/container";
import { lambdaHttpAdapter } from "@/main/adapters/lambda-http-adapter";

const controller = container.resolve(HelloController);

export const handler = lambdaHttpAdapter(controller);
