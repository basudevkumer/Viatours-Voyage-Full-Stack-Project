import { cloneElement, useId } from "react";
import { cn } from "@/lib/cn";
export default function FormField({ label, helperText, error, children, className, required = false }) {
  const generated = useId();
  const control = cloneElement(children, { id: children.props.id || generated, "aria-invalid": error ? true : children.props["aria-invalid"], "aria-describedby": [children.props["aria-describedby"], helperText && `${generated}-help`, error && `${generated}-error`].filter(Boolean).join(" ") || undefined });
  return <div className={cn("grid gap-1.5", className)}>{label && <label className="title4 text-dark" htmlFor={control.props.id}>{label}{required && <span aria-hidden="true"> *</span>}</label>}{control}{error ? <p id={`${generated}-error`} className="body5 text-error">{error}</p> : helperText ? <p id={`${generated}-help`} className="body5 text-text-secondary">{helperText}</p> : null}</div>;
}
