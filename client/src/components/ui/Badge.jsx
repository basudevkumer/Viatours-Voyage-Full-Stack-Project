import { cn } from "@/lib/cn";
const variants = { accent: "bg-accent text-white", dark: "bg-dark text-white", light: "bg-white text-dark", success: "bg-bg-success text-success" };
export default function Badge({ variant = "light", className, children, ...props }) {
  return <span className={cn("body5 inline-flex items-center rounded-full px-3 py-1 font-medium", variants[variant] || variants.light, className)} {...props}>{children}</span>;
}
