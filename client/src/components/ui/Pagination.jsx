import { cn } from "@/lib/cn";
export default function Pagination({ page, pageCount, onPageChange, className }) {
  if (!pageCount || pageCount < 2) return null;
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const controlClass = "inline-flex h-11 min-w-11 items-center justify-center rounded-lg border border-gray5 px-3 title4 text-dark hover:border-accent disabled:opacity-50";
  return <nav aria-label="Pagination" className={cn("flex flex-wrap items-center justify-center gap-2", className)}><button type="button" className={controlClass} onClick={() => onPageChange(page - 1)} disabled={page <= 1}>Previous</button>{pages.map((value) => <button key={value} type="button" className={cn(controlClass, page === value && "border-accent bg-accent text-white")} aria-current={page === value ? "page" : undefined} aria-label={`Page ${value}`} onClick={() => onPageChange(value)}>{value}</button>)}<button type="button" className={controlClass} onClick={() => onPageChange(page + 1)} disabled={page >= pageCount}>Next</button></nav>;
}
