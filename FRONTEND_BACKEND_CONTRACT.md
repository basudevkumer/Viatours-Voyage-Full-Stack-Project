# Frontend ↔ Backend Contract

This file defines the boundary between `client/` and `server/`.

## Responsibility split

### Client

- UI and UX.
- Route-level rendering.
- Form interaction.
- Optimistic/local state where appropriate.
- API consumption.
- User-friendly loading/error states.

### Server

- Authentication and authorization.
- Request validation.
- Business rules.
- Database access.
- Sensitive integrations.
- Canonical error responses.

## API rules

- Version public APIs when a breaking change is expected.
- Use resource-oriented routes.
- Use consistent HTTP status codes.
- Return predictable JSON shapes.
- Never return passwords, password hashes, reset tokens, or other secrets.
- Validate every untrusted request on the server.

Recommended response shape:

```json
{
  "success": true,
  "message": "Human-readable result",
  "data": {}
}
```

Recommended error shape:

```json
{
  "success": false,
  "message": "What went wrong",
  "errors": []
}
```

## Service boundary

Frontend components should call service functions such as:

```text
services/authService
services/tourService
services/bookingService
```

rather than embedding fetch/axios configuration inside every component.

## Authentication

The exact auth implementation will be decided when the server is built. Keep token/cookie handling centralized; do not scatter credential handling across UI components.
