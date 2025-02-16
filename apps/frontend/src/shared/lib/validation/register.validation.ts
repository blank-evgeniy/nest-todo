import { z } from 'zod';

export const registerFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(1, { message: 'Email is required' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' })
      .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one digit' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormInput = z.infer<typeof registerFormSchema>;
