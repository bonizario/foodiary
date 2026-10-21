import { z } from "zod";

import { BiologicalSex } from "@/app/types/biological-sex";

import { toLocalDateString } from "@/shared/functions/to-local-date-string";

export const editProfileSchema = z.object({
  name: z
    .string({ error: "Informe o nome" })
    .min(1)
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  birthdate: z.date({ error: "Informe a data de nascimento" }).transform(toLocalDateString),
  height: z.coerce
    .number<string>({ error: "Informe a altura" })
    .min(1)
    .max(500, "A altura deve ser no máximo 500"),
  weight: z.coerce
    .number<string>({ error: "Informe o peso" })
    .min(1)
    .max(500, "O peso deve ser no máximo 500"),
  biologicalSex: z.enum(BiologicalSex, "Informe o sexo biológico"),
});

export type EditProfileSchemaInput = z.input<typeof editProfileSchema>;
export type EditProfileSchemaOutput = z.output<typeof editProfileSchema>;
