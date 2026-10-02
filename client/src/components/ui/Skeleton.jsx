import { cn } from "@/lib/cn";
export default function Skeleton({ className, ...props }) {
  return <span aria-hidden="true" className={cn("block animate-pulse rounded-lg bg-gray6 motion-reduce:animate-none", className)} {...props} />;
}
