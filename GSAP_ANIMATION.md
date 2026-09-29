# GSAP Animation System

## Purpose

This document defines the animation and motion system for the Viatours Voyage project.

The goal is to create a premium, modern and cinematic user experience without sacrificing usability, accessibility or performance.

Animation is a design system element.

It must remain consistent across the entire application.

---

# 1. Core Animation Philosophy

All animations should follow:

Purposeful
→ Subtle
→ Smooth
→ Responsive
→ Performant
→ Accessible

Animation must support:

- visual hierarchy
- user orientation
- content discovery
- interaction feedback
- storytelling
- conversion

Animation must NOT exist only for decoration.

---

# 2. Motion Personality

Viatours Voyage should feel:

- Premium
- Calm
- Confident
- Modern
- Cinematic
- Travel-inspired
- Refined

Avoid motion that feels:

- childish
- chaotic
- excessive
- gimmicky
- mechanical
- distracting

---

# 3. Preferred Animation Types

Use these patterns where appropriate:

## Entrance Animations

- fade
- fade + translate
- subtle scale
- clip-path reveal
- image reveal

## Scroll Animations

- fade-up
- fade-in
- staggered reveal
- image reveal
- subtle parallax

## Hover Animations

- image scale
- subtle translate
- shadow/elevation change
- CTA movement
- overlay reveal

## Continuous Motion

Use only when meaningful:

- marquee
- ticker
- subtle background movement

---

# 4. Animation Intensity

Use a hierarchy.

## Hero

Highest visual motion priority.

Can use:

- image reveal
- heading reveal
- staggered text
- CTA reveal
- subtle background movement

Do not animate everything simultaneously.

---

## TrustBar

Use:

- seamless horizontal marquee
- consistent speed
- continuous movement

Marquee must not feel aggressive.

Recommended behavior:

- pause on hover where appropriate
- respect reduced-motion
- prevent content duplication issues
- avoid layout shift

---

## Standard Sections

Use subtle scroll reveal.

Recommended sequence:

1. Section heading
2. Supporting text
3. Main visual/content
4. CTA

Use stagger only when it improves readability.

---

## Cards

Use micro-interactions.

Examples:

- image scale: subtle
- content translate: very small
- shadow/elevation transition
- CTA reveal

Avoid large card movement.

---

## Final CTA

Use subtle emphasis.

Possible:

- image movement
- content reveal
- background visual motion

Do not create aggressive looping animation.

---

# 5. Timing Guidelines

Use consistent timing.

Typical ranges:

Fast:
150–250ms

Standard:
300–500ms

Cinematic:
600–1000ms

Long storytelling:
1000–1500ms

Do not use long durations for simple UI feedback.

---

# 6. Easing

Prefer natural easing.

Recommended:

- power2.out
- power3.out
- power4.out
- expo.out
- circ.out

For smooth UI interactions:

- power2.out
- power3.out

For premium hero reveals:

- power3.out
- expo.out

Avoid excessive bouncing.

Avoid elastic easing unless there is a very strong UX reason.

---

# 7. Stagger

Use stagger carefully.

Recommended:

0.05s – 0.12s

for:

- navigation items
- cards
- feature items
- small content groups

Do not create huge delays between elements.

---

# 8. ScrollTrigger

GSAP ScrollTrigger may be used for:

- section entrance
- image reveal
- staggered content
- horizontal storytelling
- subtle parallax

Default behavior should be lightweight.

Avoid attaching ScrollTrigger to every DOM element.

Group animations where possible.

---

# 9. React / Next.js Rules

When using GSAP inside React/Next.js:

- Use client components only when required.
- Keep GSAP logic isolated.
- Use `useLayoutEffect` where appropriate.
- Use `gsap.context()` for cleanup.
- Kill/revert animations when components unmount.
- Avoid direct DOM manipulation outside controlled animation scopes.

Example architecture:

```text
components/
  animation/
    ...