import "reflect-metadata";

import { HelloController } from "@/application/controllers/hello-controller";
import { Registry } from "@/core/di/registry";
import { lambdaHttpAdapter } from "@/main/adapters/lambda-http-adapter";

const controller = Registry.getInstance().resolve(HelloController);

export const handler = lambdaHttpAdapter(controller);
