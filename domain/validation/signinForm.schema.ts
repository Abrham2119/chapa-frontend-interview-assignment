import { z } from 'zod';

export const signinFormSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['user', 'admin', 'super-admin']),
});

export type signinFormValues = z.infer<typeof signinFormSchema>;
