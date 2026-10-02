import { cn } from "@/lib/cn";
export default function StatItem({ value, label, className }) {
  return <div className={cn("px-4 py-6 text-center", className)}><p className="heading !text-2xl text-dark sm:!text-3xl">{value}</p><p className="body4 mt-1 text-text-secondary">{label}</p></div>;
}
