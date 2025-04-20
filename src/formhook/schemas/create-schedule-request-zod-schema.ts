import { z } from 'zod';

export const createScheduleRequestSchema = z
  .object({
    name: z.string(),
    endHour: z.string(),
    startHour: z.string(),
    proposalId: z.string(),
    workerNumber: z.number(),
    id: z.string().optional(),
    description: z.string().optional(),
  })


export type CreateScheduleRequestSchema = z.infer<typeof createScheduleRequestSchema>;