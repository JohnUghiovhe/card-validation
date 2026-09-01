import { Router } from 'express';
import { validateRequest } from '../middleware/validate-request.js';
import { cardValidationRequestSchema } from '../validators/card-request.schema.js';

const router = Router();

router.post(
  '/validate',
  validateRequest(cardValidationRequestSchema),
  (_req, res) => {
    res.status(200).json({
      message: 'Request is valid',
    });
  },
);

export default router;