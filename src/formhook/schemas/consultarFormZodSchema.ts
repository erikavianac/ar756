import { z } from 'zod';

export const consultarFormSchema = z.object({
  trafficSource: z.enum(["AIRBNB", "GOOGLE", "INSTAGRAM", "TIKTOK", "OTHER", "FRIEND", "FACEBOOK"]),
  knowsVenue: z.boolean({
    required_error: 'Este campo e obrigatorio!',
  }),
  termsAccepted: z.boolean({
    required_error: 'Este campo e obrigatorio!',
  }).refine(
    (val) => val === true,
    {
      message: 'Os termos devem ser aceitos para o envio do orcamento.',
    },
  ),
  type: z.enum(["PRODUCTION", "BARTER", "OTHER", "EVENT"]),
  endHour: z
    .string()
    .nonempty('Este campo é obrigatório!')
    .refine(
      (val) => {
        const horario = val.split(':');
        const hora = parseInt(horario[0]);
        return hora >= 7 && hora <= 22;
      },
      {
        message: 'O fim do evento deve estar entre 7:00 e 22:00',
      },
    ),
  date: z.string().nonempty('Este campo e obrigatorio!'),
  startHour: z
    .string()
    .nonempty('Este campo é obrigatório!')
    .refine(
      (val) => {
        const horario = val.split(':');
        const hora = parseInt(horario[0]);
        return hora >= 7 && hora <= 22;
      },
      {
        message: 'O inicio do evento deve estar entre 7:00 e 22:00',
      },
    ),
  serviceIds: z.array(z.string()),
  completeClientName: z
    .string()
    .nonempty('Este campo e obrigatorio!')
    .min(5, 'Nome deve conter pelo menos 5 caracteres.'),
  email: z.string().email('Email invalido!').nonempty('Este campo e obrigatorio!'),
  venueId: z.string(),
  whatsapp: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Digite um número de whatsapp válido') // Regex para validar um número de celular
    .min(15, 'Digite um número de telefone válido')
    .max(15, 'Digite um número de telefone válido'),
  description: z
    .string()
    .nonempty('Este campo e obrigatorio!')
    .min(10, 'A descricao do evento deve conter pelo menos 10 caracteres.'),
  guestNumber: z
    .string()
    .nonempty('Este campo e obrigatorio!')
    .transform((val) => parseInt(val))
    .refine((val) => val <= 150, {
      message: 'O número de convidados não pode ser maior que 150',
    })
    .refine((val) => val > 0, {
      message: 'O número de convidados não pode 0',
    }),
});
