# Card Number Validator

## Overview

A small REST API that validates card numbers using the Luhn
checksum algorithm.

The API accepts a card number as a string and returns whether
the number passes the validation algorithm. Request-shape
validation and card-number validity are handled separately.

## Tech Stack

- Node.js 22
- TypeScript
- Express
- Zod
- Vitest
- Supertest
- ESLint
- Prettier
- GitHub Actions

## Getting Started

### Prerequisites

- Node.js 22 or later
- npm
- Git

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/JohnUghiovhe/card-validation.git
cd card-validation
npm ci
```

## Running the Application

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## Testing

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

`npm run check` verifies formatting, linting, tests, and the
TypeScript build.

Tests are split into two categories:

- `tests/unit/` — pure function tests for the Luhn algorithm.
- `tests/integration/` — HTTP-level tests using Supertest against
  the Express app.

## API

### POST `/api/v1/cards/validate`

Validates a card number using the Luhn algorithm.

**Request body:**

```json
{
  "cardNumber": "4111111111111111"
}
```

**Valid Card Response (200):**

```json
{
  "valid": true
}
```

**Invalid Card Response (200):**

```json
{
  "valid": false
}
```
A card number that is well-formed but fails the Luhn checksum
is not treated as an HTTP error. It returns HTTP `200` with
`"valid": false`.

**Validation error response (400):**

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "..."
  }
}
```

### GET `/health`

Returns the health status of the service.

**Response (200):**

```json
{
  "status": "ok"
}
```

## Validation Rules

Request validation is handled by Zod before the controller is
reached. The `cardNumber` field must:

- Be a string
- Be non-empty after trimming whitespace
- Contain only digits (no dashes, spaces, or letters)

After the request passes the input contract, the card number is
validated using the Luhn checksum algorithm.

The implementation does not attempt to determine whether a card
has actually been issued, is active, belongs to a particular
person, or has available funds. Those checks require external
systems and are outside the scope of this assessment.

## Error Handling

All errors return a consistent JSON shape:

```json
{
  "error": {
    "code": "<ERROR_CODE>",
    "message": "<human-readable message>"
  }
}
```

| Status | Code                 | When                                     |
| ------ | -------------------- | ---------------------------------------- |
| 400    | `INVALID_REQUEST`    | Malformed JSON, missing/invalid fields   |
| 404    | `NOT_FOUND`          | No route matches the request path        |
| 500    | `INTERNAL_SERVER_ERROR` | Unhandled exception                  |

## Design Decisions

### Card number is represented as a string

Card numbers are treated as identifiers rather than numeric
quantities. Using a string avoids numeric precision concerns
and preserves leading zeroes.

### Validation is split across two layers

Zod enforces request shape (type, presence, format) while the
service layer enforces business rules (Luhn checksum). This
keeps each concern independent and independently testable.

### Request validation is separate from card validity

Malformed input is an API/client error and returns HTTP 400.
A well-formed card number that fails the Luhn checksum is a
successful validation request and returns HTTP 200 with
`valid: false`.

### No hard-coded card length

The implementation does not require exactly 16 digits because
the assessment does not specify a fixed card length. The request
contract checks that the value is a non-empty digit string, while
the Luhn algorithm determines checksum validity.

### Separation of responsibilities

Routes define HTTP endpoints, middleware handles request and
error concerns, controllers coordinate HTTP requests with the
validation logic, and the validation service contains the Luhn
algorithm.

## Project Structure

```
src/
  app.ts                              # Express app setup
  server.ts                           # Entrypoint, starts listening
  controllers/
    card.controller.ts                # Handles POST /validate
  middleware/
    error-handler.ts                  # error handlers
    validate-request.ts               # Request validation 
  routes/
    card.routes.ts                    # Card-related routes
  services/
    validate-card-number.ts           # Luhn algorithm implementation
  validators/
    card-request.schema.ts            # Zod schema for the request body
tests/
  unit/
    validate-card-number.test.ts      # Unit tests for Luhn logic
  integration/
    card-validation.test.ts           # HTTP-level endpoint tests
```

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start dev server with hot reload     |
| `npm run build`    | Compile TypeScript to `dist/`        |
| `npm start`        | Run the compiled production build    |
| `npm test`         | Run tests once                       |
| `npm run test:watch` | Run tests in watch mode            |
| `npm run lint`     | Lint with ESLint                     |
| `npm run lint:fix` | Lint and auto-fix                    |
| `npm run format`   | Format with Prettier                 |
| `npm run format:check` | Check formatting                 |
| `npm run check`    | Run format check, lint, test, build  |
