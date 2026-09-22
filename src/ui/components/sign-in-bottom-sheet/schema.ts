import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Informe um email válido"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 dígitos")
    .max(128, "A senha deve ter no máximo 128 dígitos"),
});

export type SignInSchema = z.output<typeof signInSchema>;
