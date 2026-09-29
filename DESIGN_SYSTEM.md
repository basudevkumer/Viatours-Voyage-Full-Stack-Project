# Design System — Viatours Voyage

The design system exists to keep every page visually related. `client/src/components/style/design-tokens.css` is the implementation source of truth for colors and typography utilities.

## Brand palette

| Token | Value | Usage |
|---|---|---|
| `primary-start` | `#888BF4` | Gradient start / primary emphasis |
| `primary-end` | `#5151C6` | Gradient end / primary emphasis |
| `dark` | `#05073C` | Main dark brand surface and heading |
| `accent` | `#EB662B` | CTA accents, highlights, active states |
| `bg-white` | `#FFFFFF` | Primary light surface |
| `bg-cream` | `#FFF7F4` | Soft section background |
| `bg-grey` | `#F6F7F9` | Neutral section/background |
| `bg-field` | `#F3F5F7` | Form fields |

Use semantic tokens instead of raw hex values in components whenever possible.

## Typography

The project uses the local Inter font family and the shared utility scale:

- `.heading` — large section headings.
- `.title1` — major card/title text.
- `.title2` — subsection titles.
- `.title3` — navigation/small headings.
- `.title4` — labels and compact UI text.
- `.body1` — large supporting text.
- `.body3` — standard body copy.
- `.body4` — compact descriptions.
- `.body5` — tiny metadata/tags.
- `.caption` — compact metadata with wider tracking.

Do not create random `text-[...]` values for repeated patterns without a clear reason.

## Visual rules

- Prefer strong hierarchy over excessive decoration.
- Use generous whitespace around major sections.
- Keep card radii, borders, shadows, and button shapes consistent within a page family.
- Use the accent color deliberately; it should guide attention rather than decorate everything.
- Gradients should reinforce hierarchy, not reduce text readability.
- Images should use consistent aspect-ratio rules for the component they belong to.

## Responsive rule

Design mobile first, then intentionally enhance at larger breakpoints. Never rely on accidental wrapping as the responsive strategy.
