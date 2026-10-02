import Link from "next/link";
import { cn } from "@/lib/cn";
export default function Breadcrumbs({ items = [], className }) {
  return <nav aria-label="Breadcrumb" className={cn("body4 text-text-secondary", className)}><ol className="flex flex-wrap items-center gap-2">{items.map((item, index) => <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">{index > 0 && <span aria-hidden="true">/</span>}{item.href && index < items.length - 1 ? <Link href={item.href} className="rounded-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{item.label}</Link> : <span aria-current={index === items.length - 1 ? "page" : undefined}>{item.label}</span>}</li>)}</ol></nav>;
}
