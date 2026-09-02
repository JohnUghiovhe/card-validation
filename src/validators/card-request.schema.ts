import { z } from 'zod';

export const cardValidationRequestSchema = z.object({
  cardNumber: z
    .string()
    .trim()
    .min(1, 'cardNumber must be a non-empty string')
    .regex(/^\d+$/, 'cardNumber must contain only digits'),
});

export type CardValidationRequest = z.infer<typeof cardValidationRequestSchema>;
