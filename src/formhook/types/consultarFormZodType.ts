import { z } from 'zod';
import { consultarFormSchema } from '../schemas/consultarFormZodSchema';

export type ConsultarFormData = z.infer<typeof consultarFormSchema>;
