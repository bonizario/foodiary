import { create } from "axios";

import { env } from "@/app/config/env";

export abstract class Service {
  protected static client = create({
    baseURL: env.api.url,
  });
}
