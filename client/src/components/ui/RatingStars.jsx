import { FiStar } from "react-icons/fi";
import { cn } from "@/lib/cn";
const sizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };
export default function RatingStars({ rating, reviewsCount, size = "md", showCount = false, className }) {
  const value = Number(rating);
  if (!Number.isFinite(value)) return null;
  return <span className={cn("inline-flex items-center gap-1.5", className)} aria-label={`Rated ${value} out of 5${reviewsCount == null ? "" : ` from ${reviewsCount} reviews`}`}><span aria-hidden="true" className={cn("inline-flex gap-0.5 text-star-rating", sizes[size] || sizes.md)}>{Array.from({ length: 5 }, (_, index) => <FiStar key={index} className={index < Math.round(value) ? "fill-current" : ""} />)}</span><span className="font-semibold text-dark">{value.toFixed(1)}</span>{showCount && reviewsCount != null && <span className="body5 text-text-secondary">({reviewsCount} reviews)</span>}</span>;
}
