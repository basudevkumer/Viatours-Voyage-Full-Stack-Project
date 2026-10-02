import { useId } from "react";
import { cn } from "@/lib/cn";
export default function Radio({ label, helperText, error, className, id, ...props }) {
  const generated = useId(); const controlId = id || generated; const helpId = `${controlId}-help`; const errorId = `${controlId}-error`;
  return <div className="grid gap-1"><label htmlFor={controlId} className={cn("inline-flex min-h-11 items-center gap-2", className)}><input id={controlId} type="radio" aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : helperText ? helpId : undefined} className="h-4 w-4 accent-accent" {...props} /><span className="body4 text-dark">{label}</span></label>{error ? <p id={errorId} className="body5 text-error">{error}</p> : helperText ? <p id={helpId} className="body5 text-text-secondary">{helperText}</p> : null}</div>;
}
