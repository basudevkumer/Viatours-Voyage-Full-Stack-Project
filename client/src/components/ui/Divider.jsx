import { cn } from "@/lib/cn";
export default function Divider({ className, ...props }) {
  return <hr className={cn("border-0 border-t border-gray6", className)} {...props} />;
}
