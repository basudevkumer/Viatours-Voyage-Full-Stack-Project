"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({ as: Element = "div", children, className, selector = "[data-reveal]" }) {
  const root = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!root.current || reducedMotion) return;
    const context = gsap.context(() => {
      const targets = gsap.utils.toArray(selector, root.current);
      if (targets.length) ScrollTrigger.batch(targets, { start: "top 88%", onEnter: batch => gsap.fromTo(batch, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, overwrite: true }) });
    }, root);
    return () => context.revert();
  }, [reducedMotion, selector]);
  return <Element ref={root} className={cn(className)}>{children}</Element>;
}
