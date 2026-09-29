# UI/UX Rules — Viatours Voyage

## Layout

Every page should have a clear visual hierarchy:

1. Context/navigation.
2. Primary page promise or task.
3. Supporting information.
4. Proof/trust where relevant.
5. Primary action.
6. Secondary exploration.

Use the shared `Container` and existing layout components before introducing another page-width system.

## Navigation

- Keep primary navigation predictable.
- Active states must be visually obvious.
- Mobile navigation must be keyboard accessible and easy to dismiss.
- Avoid adding links simply because there is available space.

## Components

Each interactive component should have:

- clear purpose;
- visible state changes;
- keyboard focus;
- sensible disabled/loading states;
- accessible labels where icon-only controls are used.

## Forms

- Label fields clearly.
- Keep validation close to the relevant field.
- Show useful error messages.
- Preserve entered values when validation fails.
- Make the primary submit action visually dominant.

## Responsive behavior

Check at minimum:

- small mobile;
- large mobile;
- tablet;
- laptop;
- large desktop.

Do not simply shrink desktop layouts. Recompose complex sections when necessary.

## Accessibility

- Use semantic HTML.
- Maintain visible keyboard focus.
- Provide meaningful `alt` text for informative images.
- Use empty alt text for decorative images.
- Preserve readable contrast.
- Do not communicate meaning through color alone.
- Respect reduced-motion preferences for non-essential animation.

## Motion

Animation should explain state, provide feedback, or establish hierarchy. Avoid animation that delays task completion or distracts from the primary CTA.
