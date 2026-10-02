import { cn } from "@/lib/cn";
export default function Card({ as: Element = "article", className, children, ...props }) {
  return <Element className={cn("group overflow-hidden rounded-2xl border border-gray6 bg-white", className)} {...props}>{children}</Element>;
}
