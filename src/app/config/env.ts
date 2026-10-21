import { z } from "zod";

const schema = z.object({
  EXPO_PUBLIC_API_URL: z.url(),
  EXPO_PUBLIC_API_RESPONSE_SLEEP_MS: z.coerce.number().optional(),
});

const parsedEnv = schema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_API_RESPONSE_SLEEP_MS: process.env.EXPO_PUBLIC_API_RESPONSE_SLEEP_MS,
});

export const env = {
  api: {
    url: parsedEnv.EXPO_PUBLIC_API_URL,
    responseSleepMs: parsedEnv.EXPO_PUBLIC_API_RESPONSE_SLEEP_MS,
  },
};
