import { z } from "zod";

import { ActivityLevel } from "@/app/constants/activity-level";
import { BiologicalSex } from "@/app/constants/biological-sex";
import { Goal } from "@/app/constants/goal";

const passwordSchema = z
  .string()
  .min(8, "Senha deve ter no mínimo 8 caracteres")
  .max(128, "Senha deve ter no máximo 128 caracteres")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])/,
    "Senha deve incluir letras maiúsculas, minúsculas, números e símbolos",
  );

export const onboardingSchema = z.object({
  goal: z.enum(Goal),
  biologicalSex: z.enum(BiologicalSex),
  birthdate: z.date(),
  height: z.coerce
    .number<string>({ error: "Informe uma altura válida" })
    .min(1)
    .max(999),
  weight: z.coerce
    .number<string>({ error: "Informe um peso válido" })
    .min(1)
    .max(999),
  activityLevel: z.enum(ActivityLevel),
  account: z
    .object({
      name: z.string({ error: "Informe um nome válido" }).min(1),
      email: z.email({ error: "Informe um email válido" }),
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas devem ser iguais",
      path: ["confirmPassword"],
    }),
});

export type OnboardingSchemaInput = z.input<typeof onboardingSchema>;
export type OnboardingSchemaOutput = z.output<typeof onboardingSchema>;
