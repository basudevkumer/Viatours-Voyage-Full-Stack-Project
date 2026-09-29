"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeMotion = ({ children }) => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const hero = root.querySelector("[data-home-hero]");
      const heroCopy = hero?.querySelector("[data-hero-copy]");
      const revealSections = gsap.utils.toArray("section:not([data-home-hero])", root);

      if (reduceMotion) {
        gsap.set(root.querySelectorAll("[data-home-hero], section"), {
          autoAlpha: 1,
          clearProps: "opacity,visibility,transform",
        });
        return;
      }

      if (heroCopy) {
        gsap.fromTo(
          heroCopy.children,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, clearProps: "all" }
        );
      }

      if (revealSections.length) {
        gsap.set(revealSections, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(revealSections, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true,
          }),
        });
      }

      const heroBackground = hero?.matches("[data-hero-background]") ? hero : hero?.querySelector("[data-hero-background]");
      if (heroBackground) {
        gsap.to(heroBackground, {
          backgroundPosition: "50% 55%",
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);

    return () => context.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
};

export default HomeMotion;
