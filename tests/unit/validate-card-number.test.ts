import { describe, expect, it } from 'vitest';
import { validateCardNumber } from '../../src/services/validate-card-number.js';

describe('validateCardNumber', () => {
  it('returns true for a valid Luhn card number', () => {
    expect(validateCardNumber('4111111111111111')).toBe(true);
  });

  it('returns false for an invalid Luhn card number', () => {
    expect(validateCardNumber('4111111111111112')).toBe(false);
  });

  it('returns false for an empty string', () => {
    expect(validateCardNumber('')).toBe(false);
  });

  it('returns false for a value containing non-digit characters', () => {
    expect(validateCardNumber('4111-1111-1111-1111')).toBe(false);
  });

  it('returns false for a value containing letters', () => {
    expect(validateCardNumber('411111111111111a')).toBe(false);
  });

  it('returns true for other valid Luhn numbers', () => {
    expect(validateCardNumber('79927398713')).toBe(true);
    expect(validateCardNumber('6011111111111117')).toBe(true);
  });

  it('returns false for other invalid Luhn numbers', () => {
    expect(validateCardNumber('79927398714')).toBe(false);
    expect(validateCardNumber('6011111111111118')).toBe(false);
  });
});