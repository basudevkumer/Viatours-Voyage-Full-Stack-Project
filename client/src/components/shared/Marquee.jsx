import { cn } from "@/lib/cn";

export default function Marquee({ items = [], renderItem, label = "Scrolling content", className }) {
  return <div className={cn("overflow-hidden", className)} role="region" aria-label={label}><div className="trust-marquee flex w-max items-center">{[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">{items.map((item, index) => <div key={`${copy}-${item.id ?? index}`}>{renderItem ? renderItem(item, index) : item}</div>)}</div>)}</div></div>;
}
