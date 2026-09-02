import express from 'express';
import { notFoundHandler, errorHandler } from './middleware/error-handler.js';
import cardRoutes from './routes/card.routes.js';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    name: 'Card Validation API',
    status: 'ok',
    message: 'Card validation service is running',
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

app.use('/api/v1/cards', cardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
