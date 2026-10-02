"use client";
import { useEffect } from "react";
export default function useOnClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;
    const onPointerDown = (event) => { if (!ref.current?.contains(event.target)) handler(event); };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [ref, handler, enabled]);
}
