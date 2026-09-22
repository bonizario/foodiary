import { z } from "zod";

import { ActivityLevel } from "@/app/constants/activity-level";
import { Gender } from "@/app/constants/gender";
import { Goal } from "@/app/constants/goal";
import { passwordSchema } from "@/app/schemas/password-schema";

export const onboardingSchema = z.object({
  goal: z.enum(Goal),
  gender: z.enum(Gender),
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
