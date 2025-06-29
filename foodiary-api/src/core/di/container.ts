import { HelloController } from "@/application/controllers/hello-controller";
import { HelloUseCase } from "@/application/use-cases/hello-use-case";
import { Registry } from "@/core/di/registry";

export const container = Registry.getInstance();

container.register(HelloUseCase);
container.register(HelloController);
