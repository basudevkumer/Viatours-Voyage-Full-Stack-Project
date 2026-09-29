# Architecture — Viatours Voyage

## Monorepo boundary

```text
root
├── client/   → Next.js frontend
└── server/   → Express/MongoDB backend
```

The frontend owns presentation, routing, browser interaction, and API consumption. The backend owns authentication, authorization, validation, business rules, persistence, and external server-side integrations.

## Client structure

### `src/app`
Next.js App Router routes, route groups, layouts, metadata, and page entry points.

### `src/components`
Reusable UI.

- `helper/` — frontend data/image helpers that support components.
- `layout/` — site-wide navigation and footer.
- `shared/` — reusable cards, buttons, containers, and other composed primitives.
- `style/` — design tokens and visual-system rules.
- `ui/` — low-level, highly reusable UI primitives.

### `src/sections`
Page-level sections composed from reusable components. A section should represent a meaningful block of a page, not a generic button/card.

### `src/context`
React context providers for cross-cutting client concerns.

### `src/hooks`
Reusable client hooks. Keep them focused and composable.

### `src/lib`
Technical integrations and framework-independent utilities.

### `src/services`
API calls and service-layer functions. UI components should consume services instead of embedding fetch details everywhere.

### `src/store`
Global client state when context/local state is not appropriate.

## Server structure

- `config/` — environment and infrastructure configuration.
- `controllers/` — translate HTTP requests into application actions/responses.
- `middlewares/` — auth, validation, errors, logging, security, etc.
- `models/` — Mongoose schemas/models.
- `routes/` — HTTP route definitions.
- `services/` — business logic and external integrations.
- `utils/` — small shared server utilities.
- `validators/` — request validation schemas/rules.
- `tests/` — automated tests.

Recommended request flow:

```text
Route → Middleware/Validation → Controller → Service → Model/External API
                                           ↓
                                      Response
```

## Dependency direction

Prefer one-way dependencies:

```text
app/pages → sections → shared/ui
                  ↘ services/hooks/lib
```

Do not make low-level UI components depend on page-specific sections or business-specific modules.
