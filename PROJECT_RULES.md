# Project Rules — Viatours Voyage

This document is the project-wide source of truth for implementation decisions.

## 1. Product goal

Build a modern travel/tour platform that feels premium, trustworthy, fast, easy to navigate, and conversion-focused. Visual polish must never come at the expense of usability, accessibility, performance, or maintainability.

## 2. Technology direction

- Frontend: Next.js App Router + React.
- Styling: Tailwind CSS with the shared design-token layer.
- Backend target: Node.js + Express + MongoDB/Mongoose.
- Frontend and backend are separated into `client/` and `server/`.
- Prefer server components by default; use client components only when interactivity or browser APIs require them.

## 3. Non-negotiables

- Reuse existing components before creating duplicates.
- Reuse existing design tokens before adding new colors.
- Follow the shared typography scale before inventing font sizes.
- Keep responsive behavior intentional across mobile, tablet, laptop, and large desktop.
- Do not hide important actions behind unnecessary interactions.
- Do not hard-code API URLs inside UI components.
- Keep business logic out of presentational components.
- Validate forms on the client for UX and on the server for security/correctness.
- Never commit secrets, tokens, credentials, or real environment files.

## 4. Naming

- React components: PascalCase.
- Hooks: `useSomething`.
- Services/helpers: descriptive camelCase names.
- Routes/pages follow Next.js App Router conventions.
- Avoid unexplained abbreviations.

## 5. Quality gate

Before considering a change complete:

1. Check imports and aliases.
2. Run lint.
3. Run production build for structural changes.
4. Check responsive states.
5. Check keyboard focus for interactive elements.
6. Check loading, empty, error, and success states where applicable.
7. Confirm the change did not create a duplicate component or design token.
