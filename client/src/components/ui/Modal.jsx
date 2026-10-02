"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import IconButton from "@/components/ui/IconButton";
import { FiX } from "react-icons/fi";

export default function Modal({ open, onClose, title, children, className, overlayClassName, closeOnOverlay = true }) {
  const titleId = useId(); const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
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
      <div className="mb-4 flex items-start justify-between gap-4"><h2 id={titleId} className="title1 text-dark">{title}</h2><IconButton icon={<FiX aria-hidden="true" />} label="Close dialog" variant="ghost" onClick={onClose} className="-mr-2 -mt-2" /></div>{children}
    </section>
  </div>;
}
