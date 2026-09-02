import { Router } from 'express';
import { validateCardController } from '../controllers/card.controller.js';
import { validateRequest } from '../middleware/validate-request.js';
import { cardValidationRequestSchema } from '../validators/card-request.schema.js';

const router = Router();

router.post(
  '/validate',
  validateRequest(cardValidationRequestSchema),
  validateCardController,
);

export default router;