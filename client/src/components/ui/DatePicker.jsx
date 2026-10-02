import { useId } from "react";
import { cn } from "@/lib/cn";

export default function DatePicker({ label = "Date", value, onChange, min, max, error, helperText, className, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const minimum = min || new Date().toISOString().slice(0, 10);
  return <div className="grid gap-1.5"><label htmlFor={id} className="title4 text-dark">{label}</label><input id={id} type="date" value={value} min={minimum} max={max} onChange={onChange} aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : helperText ? helpId : undefined} className={cn("body4 min-h-11 w-full rounded-xl border border-gray5 bg-white px-3 py-2.5 text-dark focus:border-accent focus:outline-none", error && "border-error", className)} {...props} />{error ? <p id={errorId} className="body5 text-error">{error}</p> : helperText ? <p id={helpId} className="body5 text-text-secondary">{helperText}</p> : null}</div>;
}
