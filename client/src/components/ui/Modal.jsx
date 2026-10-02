"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";

export default function Modal({ open, onClose, title, children, className, overlayClassName, closeOnOverlay = true }) {
  const titleId = useId(); const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useLockBodyScroll(open);
  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const focusable = () => panelRef.current?.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])') || [];
    focusable()[0]?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") { closeRef.current?.(); return; }
      if (event.key !== "Tab") return;
      const elements = [...focusable()];
      if (!elements.length) { event.preventDefault(); panelRef.current?.focus(); return; }
      const first = elements[0]; const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); previouslyFocused?.focus?.(); };
  }, [open]);
  if (!open) return null;
  return <div className={cn("fixed inset-0 z-[70] flex items-center justify-center p-4", overlayClassName)} onMouseDown={(event) => { if (closeOnOverlay && !panelRef.current?.contains(event.target)) onClose?.(); }}>
    <div aria-hidden="true" className="absolute inset-0 bg-dark/50" />
    <section ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} className={cn("relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl", className)}>
      <h2 id={titleId} className="title1 text-dark">{title}</h2>{children}
    </section>
  </div>;
}
