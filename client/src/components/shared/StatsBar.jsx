import Container from "@/components/shared/Container";
import StatItem from "@/components/shared/StatItem";
import { cn } from "@/lib/cn";
export default function StatsBar({ items = [], className }) {
  if (!items.length) return null;
  return <section className={cn("border-b border-gray6 bg-white", className)}><Container><div className="grid grid-cols-2 divide-x divide-y divide-gray6 sm:grid-cols-4 sm:divide-y-0">{items.map((item) => <StatItem key={item.label} {...item} />)}</div></Container></section>;
}
