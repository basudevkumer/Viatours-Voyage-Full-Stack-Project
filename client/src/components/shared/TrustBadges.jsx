import { FiHeadphones, FiLock } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function TrustBadges({ className }) {
  return <ul className={cn("grid gap-3 sm:grid-cols-2", className)}><li className="body5 flex items-center gap-2 text-text-secondary"><FiLock aria-hidden="true" className="shrink-0 text-accent" />Secure payment</li><li className="body5 flex items-center gap-2 text-text-secondary"><FiHeadphones aria-hidden="true" className="shrink-0 text-accent" /><a href="mailto:hi@viatours.com" className="hover:text-accent">Support: hi@viatours.com</a></li></ul>;
}
