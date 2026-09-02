import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../src/app.js';

describe('POST /api/v1/cards/validate', () => {
  it('returns true for a valid card number', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({
        cardNumber: '4111111111111111',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      valid: true,
    });
  });

  it('returns false for an invalid card number', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({
        cardNumber: '4111111111111112',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      valid: false,
    });
  });

  it('returns 400 when cardNumber is missing', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_REQUEST');
  });

  it('returns 400 when cardNumber is not a string', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({
        cardNumber: 4111111111111111,
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_REQUEST');
  });

  it('returns 400 when cardNumber contains non-digit characters', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .send({
        cardNumber: '4111-1111-1111-1111',
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_REQUEST');
  });

  it('returns 400 for malformed JSON', async () => {
    const response = await request(app)
      .post('/api/v1/cards/validate')
      .set('Content-Type', 'application/json')
      .send('{"cardNumber":"4111111111111111"');
  
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        code: 'INVALID_REQUEST',
        message: 'Request body contains invalid JSON',
      },
    });
  });
  
  it('returns 404 for an unknown route', async () => {
    const response = await request(app)
      .post('/api/v1/cards/unknown')
      .send({
        cardNumber: '4111111111111111',
      });
  
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: {
        code: 'NOT_FOUND',
        message: 'Route not found',
      },
    });
  });
});