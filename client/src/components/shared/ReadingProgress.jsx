"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress({ targetRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const handleScroll = () => {
      const target = targetRef?.current || document.documentElement;
      const rect = target.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = target.scrollHeight || target.clientHeight;

      const scrolled = window.scrollY - (target.offsetTop || 0);
      const total = elementHeight - windowHeight;

      if (total <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress = Math.min(100, Math.max(0, (scrolled / total) * 100));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetRef]);

  if (progress <= 0) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
