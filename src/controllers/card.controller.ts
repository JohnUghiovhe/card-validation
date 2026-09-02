import type { RequestHandler } from 'express';
import { validateCardNumber } from '../services/validate-card-number.js';
import type { CardValidationRequest } from '../validators/card-request.schema.js';

export const validateCardController: RequestHandler = (req, res) => {
  const { cardNumber } = req.body as CardValidationRequest;

  const valid = validateCardNumber(cardNumber);

  res.status(200).json({
    valid,
  });
};