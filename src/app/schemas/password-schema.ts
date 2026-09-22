import { z } from "zod";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])/;

export const passwordSchema = z
  .string({
    error:
      "Senha deve incluir letras maiúsculas, minúsculas, números e símbolos",
  })
  .min(8)
  .max(128)
  .regex(PASSWORD_REGEX);
