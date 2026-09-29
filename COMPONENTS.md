# Component Architecture — Viatours Voyage

## Component levels

### UI primitives — `components/ui`
Small reusable building blocks: input, modal, badge, icon button, tabs, etc.

### Shared components — `components/shared`
Reusable domain-neutral compositions: cards, buttons, containers, rating displays, pagination, etc.

### Layout components — `components/layout`
Site-wide shell elements: navbar, footer, mobile navigation, etc.

### Sections — `src/sections`
Meaningful page blocks composed from lower-level components.

### Pages — `src/app`
Route-level composition. Pages should not become giant component files.

## Props rules

- Props should describe behavior/content, not implementation details.
- Prefer explicit props over deeply nested configuration objects for simple components.
- Use a data-driven API for repeated cards/lists.
- Keep default values sensible.
- Avoid boolean-prop explosions; use variants when a component has deliberate visual modes.

## Reuse rule

Before creating a component, search for an existing component with the same responsibility. If the existing component is close but not sufficient, extend it without breaking existing usage when possible.

## Naming

Use clear nouns for components:

```text
Button
Container
RatingStars
TourCard
SectionHeading
```

Avoid vague names such as `Common`, `Test`, `Box`, or `NewCard`.

## File organization

One primary component per file. Keep component-specific constants nearby unless they are shared by multiple components; shared data belongs in an appropriate helper/service/data module.

## State

Use the lowest practical state scope:

```text
local state → component
context → cross-tree concern
store → genuinely global client state
server state → service/data-fetching layer
```
