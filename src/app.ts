import express from 'express';
import cardRoutes from './routes/card.routes.js';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

app.use('/api/v1/cards', cardRoutes);

export default app;