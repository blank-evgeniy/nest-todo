import { z } from 'zod';

export const addTodoFormSchema = z.object({
  title: z.string().min(1).max(20),
  content: z.string().min(2).max(50).optional(),
});

export type AddTodoForm = z.infer<typeof addTodoFormSchema>;
