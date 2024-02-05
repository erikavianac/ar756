import { creatOrcamentoFormSchema } from '../schemas/orcamentoFormZodSchema';

import { z } from 'zod';

export type CreateAprovaOrcamentoFormData = z.infer<typeof creatOrcamentoFormSchema>;
