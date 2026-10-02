import { useId } from "react";
import { cn } from "@/lib/cn";
export default function Input({ label, labelClassName, helperText, error, leftIcon, className, wrapperClassName, id, ...props }) {
  const generated = useId(); const controlId = id || generated; const helpId = `${controlId}-help`; const errorId = `${controlId}-error`;
  return <div className={cn("grid gap-1.5", wrapperClassName)}>{label && <label htmlFor={controlId} className={cn("title4 text-dark", labelClassName)}>{label}</label>}<div className="relative">{leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">{leftIcon}</span>}<input id={controlId} aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : helperText ? helpId : undefined} className={cn("body4 min-h-11 w-full rounded-xl border border-gray5 bg-white px-3 py-2.5 text-dark focus:border-accent focus:outline-none", leftIcon && "pl-10", error && "border-error", className)} {...props} /></div>{error ? <p id={errorId} className="body5 text-error">{error}</p> : helperText ? <p id={helpId} className="body5 text-text-secondary">{helperText}</p> : null}</div>;
}
