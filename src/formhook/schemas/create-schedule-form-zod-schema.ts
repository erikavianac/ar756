import { z } from 'zod';

export const createScheduleFormSchema = z
  .object({
    name: z.string(),
    endHour: z.string(),
    startHour: z.string(),
    proposalId: z.string(),
    workerNumber: z.string(),
    id: z.string().optional(),
    description: z.string().optional(),
  })


export type CreateScheduleFormSchema = z.infer<typeof createScheduleFormSchema>;