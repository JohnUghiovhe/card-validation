import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

export const validateRequest = (schema: ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: {
          code: 'INVALID_REQUEST',
          message: result.error.issues[0]?.message ?? 'Invalid request body',
        },
      });
      return;
    }

    req.body = result.data;
    next();
  };
};
