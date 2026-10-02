import { cn } from "@/lib/cn";
const variants = { light: "bg-white text-dark hover:bg-bg-field", dark: "bg-dark text-white hover:bg-accent", ghost: "bg-transparent text-dark hover:bg-bg-field" };
const sizes = { sm: "h-11 w-11", md: "h-11 w-11", lg: "h-12 w-12" };
export default function IconButton({ label, icon, size = "md", variant = "light", className, type = "button", ...props }) {
  return <button type={type} aria-label={label} className={cn("inline-flex shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent", sizes[size] || sizes.md, variants[variant] || variants.light, className)} {...props}>{icon}</button>;
}
