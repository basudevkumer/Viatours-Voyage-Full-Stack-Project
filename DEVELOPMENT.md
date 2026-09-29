# Development Workflow — Viatours Voyage

## Before coding

1. Read `AGENT.md`.
2. Read the relevant architecture/design/CRO document.
3. Inspect existing components and routes.
4. Reuse existing patterns before adding new ones.

## Implementation

Prefer small, focused changes. Keep UI, data fetching, business logic, and infrastructure responsibilities separated.

## Validation commands

From the repository root:

```bash
npm run lint
npm run build
```

For frontend-only work:

```bash
cd client
npm run lint
npm run build
```

## Git workflow

Use small, meaningful commits. Recommended format:

```text
feat: add tour search section
fix: correct mobile navbar interaction
refactor: extract reusable rating component
style: refine destination card spacing
docs: update frontend architecture rules
```

Do not commit generated output, dependencies, environment secrets, or temporary files.

## Environment variables

- Keep secrets in `.env.local`/server environment files.
- Commit only safe examples such as `.env.example`.
- Frontend-exposed variables must use the framework's public-variable convention and must never contain secrets.

## Error handling

Handle expected failures intentionally. Avoid silent catches. User-facing errors should be understandable; logs should contain enough context for developers without leaking sensitive data.

## Performance

- Use `next/image` for content images where appropriate.
- Avoid shipping large client components when a server component can do the job.
- Lazy-load non-critical interactive content when useful.
- Avoid unnecessary global state and effects.
- Keep third-party packages purposeful.
