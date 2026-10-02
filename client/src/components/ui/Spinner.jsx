import { cn } from "@/lib/cn";
const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-9 w-9" };
export default function Spinner({ size = "md", label = "Loading", className }) {
  return <span role="status" aria-label={label} className={cn("inline-block animate-spin rounded-full border-2 border-current border-r-transparent text-accent motion-reduce:animate-none", sizes[size] || sizes.md, className)} />;
}
