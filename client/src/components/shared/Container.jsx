import { cn } from "@/lib/cn";

export default function Container({ children, className }) {
  return <div className={cn("mx-auto max-w-[1320px] px-4", className)}>{children}</div>;
}
