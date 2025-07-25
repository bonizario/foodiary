import { z } from "zod";

const schema = z.object({
  // Cognito
  COGNITO_CLIENT_ID: z.string().min(1),
  COGNITO_CLIENT_SECRET: z.string().min(1),
  COGNITO_POOL_ID: z.string().min(1),

  // DynamoDB
  DYNAMO_MAIN_TABLE: z.string().min(1),
});

export const env = schema.parse(process.env);
