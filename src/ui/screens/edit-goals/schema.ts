import { z } from "zod";

export const editGoalsSchema = z.object({
  calories: z.coerce.number<string>({ error: "Informe as calorias" }).min(0).max(10_000),
  carbohydrates: z.coerce.number<string>({ error: "Informe os carboidratos" }).min(0).max(10_000),
  proteins: z.coerce.number<string>({ error: "Informe as proteínas" }).min(0).max(10_000),
  fats: z.coerce.number<string>({ error: "Informe as gorduras" }).min(0).max(10_000),
});

export type EditGoalsSchemaInput = z.input<typeof editGoalsSchema>;
export type EditGoalsSchemaOutput = z.output<typeof editGoalsSchema>;
