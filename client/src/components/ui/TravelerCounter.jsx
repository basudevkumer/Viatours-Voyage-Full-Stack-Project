"use client";

import { cn } from "@/lib/cn";

function Counter({ label, value, min, max, onChange }) {
  return <div className="flex items-center justify-between gap-4"><div><p className="title4 text-dark">{label}</p><p className="body5 text-text-secondary">{label === "Adults" ? "Age 13+" : "Age 0–12"}</p></div><div className="flex items-center gap-2"><button type="button" disabled={value <= min} aria-label={`Remove one ${label.toLowerCase()}`} onClick={() => onChange(Math.max(min, value - 1))} className="h-11 w-11 rounded-full border border-gray5 text-dark disabled:opacity-40">−</button><output aria-label={`${value} ${label.toLowerCase()}`} className="title4 min-w-6 text-center text-dark">{value}</output><button type="button" disabled={value >= max} aria-label={`Add one ${label.toLowerCase()}`} onClick={() => onChange(Math.min(max, value + 1))} className="h-11 w-11 rounded-full border border-gray5 text-dark disabled:opacity-40">+</button></div></div>;
}

export default function TravelerCounter({ adults = 1, childCount = 0, onAdultsChange, onChildCountChange, minAdults = 1, maxAdults = 10, maxChildren = 10, className }) {
  return <div className={cn("grid gap-4", className)}><Counter label="Adults" value={adults} min={minAdults} max={maxAdults} onChange={onAdultsChange || (() => {})} /><Counter label="Children" value={childCount} min={0} max={maxChildren} onChange={onChildCountChange || (() => {})} /></div>;
}
