"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = { primary: "bg-accent text-white hover:bg-dark", secondary: "bg-dark text-white hover:bg-accent", outline: "border border-gray5 bg-transparent text-dark hover:bg-bg-field", ghost: "bg-transparent text-dark hover:bg-bg-field", white: "bg-white text-dark hover:bg-dark hover:text-white" };
const sizes = { sm: "px-4 py-2.5", md: "px-5 py-3", lg: "px-6 py-4" };
export default function Button({ variant = "primary", size = "md", href, loading = false, disabled = false, leftIcon, rightIcon, fullWidth = false, className, children, type = "button", onClick, ...rest }) {
  const inactive = disabled || loading;
  const classes = cn("title4 inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", variants[variant] || variants.primary, sizes[size] || sizes.md, fullWidth && "w-full", inactive && "cursor-not-allowed opacity-60", className);
  const content = <>{loading ? <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" /> : leftIcon}{children}{!loading && rightIcon}</>;
  if (href) return <Link href={href} className={classes} aria-disabled={inactive || undefined} tabIndex={inactive ? -1 : rest.tabIndex} onClick={(event) => { if (inactive) event.preventDefault(); else onClick?.(event); }} {...rest}>{content}</Link>;
  return <button type={type} className={classes} disabled={inactive} onClick={onClick} {...rest}>{content}</button>;
}
