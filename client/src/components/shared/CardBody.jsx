import { cn } from "@/lib/cn";
export default function CardBody({ className, children, ...props }) {
  return <div className={cn("p-5", className)} {...props}>{children}</div>;
}
