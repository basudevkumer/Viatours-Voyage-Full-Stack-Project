# Agent Instructions — Viatours Voyage

You are working on a production-minded modern travel platform. Treat the repository documentation as the project source of truth.

## Read first

Before making changes, read:

1. `PROJECT_RULES.md`
2. `ARCHITECTURE.md`
3. `DESIGN_SYSTEM.md`
4. `UI_UX.md`
5. `COMPONENTS.md`
6. `CRO.md`
7. `DEVELOPMENT.md`
8. `FRONTEND_BACKEND_CONTRACT.md` when API/server work is involved
9. `MARKETING_CONTENT.md` when copy/content is involved

## Agent behavior

- Inspect the existing code before creating new files.
- Reuse existing components and tokens.
- Preserve established visual language unless the task explicitly changes it.
- Do not introduce arbitrary colors, font sizes, spacing systems, radii, or shadows.
- Do not duplicate existing components under a new name just to solve a local problem.
- Prefer composable, data-driven components.
- Keep server/client boundaries explicit in Next.js.
- Keep API calls in the service layer.
- Do not put business logic directly inside presentational components.
- Make responsive behavior intentional.
- Consider accessibility and keyboard navigation for every interactive UI change.
- Consider CRO implications for user-facing pages: clarity, friction, trust, and CTA hierarchy.

## When creating a new section

Follow this sequence:

```text
Understand goal
→ identify user intent
→ check existing components/tokens
→ design hierarchy
→ implement responsive layout
→ add states/accessibility
→ validate lint/build
```

## When modifying an existing component

- Check every current usage first.
- Prefer backward-compatible changes.
- If an API/prop must change, update all consumers in the same task.
- Do not silently alter unrelated visual behavior.

## Before finishing

Run the relevant validation commands and report:

- files changed;
- architecture impact;
- validation performed;
- any remaining assumptions or TODOs.

## Do not

- commit secrets;
- fabricate content or data;
- add unnecessary dependencies;
- bypass validation just because a change looks small;
- rewrite the entire project for a localized requirement.
