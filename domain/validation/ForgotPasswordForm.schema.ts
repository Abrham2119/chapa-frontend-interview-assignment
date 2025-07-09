import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[0-9\s\-]{10,}$/, "Enter a valid phone number"),
    email: z.string().email("Invalid email address"),
});

export type forgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;