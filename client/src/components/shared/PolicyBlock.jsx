import { FiCalendar, FiMapPin, FiPackage } from "react-icons/fi";
import { cn } from "@/lib/cn";

const icons = { cancellation: FiCalendar, meetingPoint: FiMapPin, whatToBring: FiPackage };
const labels = { cancellation: "Cancellation", meetingPoint: "Meeting point", whatToBring: "What to bring" };
export default function PolicyBlock({ cancellation, meetingPoint, whatToBring, className }) {
  const entries = Object.entries({ cancellation, meetingPoint, whatToBring }).filter(([, value]) => value);
  if (!entries.length) return null;
  return <section className={cn("rounded-2xl border border-gray6 bg-white p-5 sm:p-7", className)}><h2 className="title1 text-dark">Good to know</h2><dl className="mt-4 grid gap-4">{entries.map(([key, value]) => { const Icon = icons[key]; return <div key={key} className="flex gap-3"><Icon aria-hidden="true" className="mt-1 shrink-0 text-accent" /><div><dt className="title4 text-dark">{labels[key]}</dt><dd className="body4 mt-1 text-text-secondary">{value}</dd></div></div>; })}</dl></section>;
}
