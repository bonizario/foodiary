import { z } from "zod";

export const emailSchema = z.string().email({ message: "Invalid email" });

export const signInPasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(128, { message: "Password must be at most 128 characters long" });

export const signUpPasswordSchema = signInPasswordSchema.regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])/,
  {
    message: "Password must include uppercase and lowercase letters, numbers, and symbols",
  },
);
