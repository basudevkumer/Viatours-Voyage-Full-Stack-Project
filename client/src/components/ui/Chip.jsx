import { cn } from "@/lib/cn";
export default function Chip({ selected = false, onClick, className, children, disabled = false, ...props }) {
  return <button type="button" aria-pressed={selected} disabled={disabled} onClick={onClick} className={cn("title4 inline-flex min-h-11 items-center justify-center rounded-full border px-4 py-2 transition-colors", selected ? "border-accent bg-accent text-white" : "border-gray5 bg-white text-dark hover:border-accent", disabled && "cursor-not-allowed opacity-50", className)} {...props}>{children}</button>;
}
