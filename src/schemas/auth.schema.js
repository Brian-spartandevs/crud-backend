import { z } from "zod";

const FORBIDDEN_PASSWORDS = [
  "123456", "12345678", "123456789", "1234567890",
  "password", "password1", "password123", "pass1234",
  "qwerty", "qwerty123", "qwertyuiop",
  "admin", "admin123", "admin1234",
  "letmein", "welcome", "monkey", "dragon",
  "master", "iloveyou", "sunshine", "princess",
  "football", "abc123", "111111",
];

const strongPasswordSchema = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos 1 mayúscula")
  .regex(/[a-z]/, "Debe contener al menos 1 minúscula")
  .regex(/[0-9]/, "Debe contener al menos 1 número")
  .regex(/[!@#$%^&*()_+\-=[\]{}|;':",.<>?/]/, "Debe contener al menos 1 carácter especial")
  .regex(/^\S+$/, "No debe contener espacios")
  .refine((p) => !FORBIDDEN_PASSWORDS.includes(p.toLowerCase()), "Contraseña demasiado común, elige otra");

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: strongPasswordSchema,
  name: z.string().min(1, "El nombre es obligatorio"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});
