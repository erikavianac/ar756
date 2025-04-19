import { z } from 'zod';

export const addPersonFormSchema = z
  .object({
    name: z.string().min(5, "Nome é obrigatório"),
    proposalId: z.string(),
    rg: z.string().optional(),
    id: z.string().optional(),
    email: z.string().optional(),
    userId: z.string().optional(),
    username: z.string().optional(),
    type: z.enum(["WORKER", "GUEST"]),
  })


export type AddPersonFormSchema = z.infer<typeof addPersonFormSchema>;