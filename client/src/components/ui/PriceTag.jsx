import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/cn";
const sizes = { sm: "body4", md: "title1", lg: "title1 sm:text-2xl" };
export default function PriceTag({ price, originalPrice, currency = "USD", prefix = "From", suffix = "/ person", size = "md", tone = "light", className }) {
  return <div className={cn("flex flex-wrap items-baseline gap-x-2", tone === "dark" ? "text-white" : "text-dark", className)}>{prefix && <span className="body5 text-text-secondary">{prefix}</span>}{originalPrice != null && <span className="body5 text-text-secondary line-through">{formatPrice(originalPrice, currency)}</span>}<span className={cn(sizes[size] || sizes.md)}>{formatPrice(price, currency)}</span>{suffix && <span className="body5 text-text-secondary">{suffix}</span>}</div>;
}
