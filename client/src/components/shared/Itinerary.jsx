import { cn } from "@/lib/cn";

export default function Itinerary({ days = [], className }) {
  if (!days.length) return null;
  return <section className={cn("rounded-2xl border border-gray6 bg-white p-5 sm:p-7", className)}><h2 className="title1 text-dark">Itinerary</h2><ol className="mt-5 space-y-5">{days.map((day, index) => <li key={day.title || day.day || index} className="relative grid grid-cols-[2.5rem_1fr] gap-3"><span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-field title4 text-accent">{day.day || index + 1}</span><div className="border-b border-gray6 pb-5"><h3 className="title3 text-dark">{day.title || `Day ${day.day || index + 1}`}</h3>{day.description && <p className="body4 mt-1 text-text-secondary">{day.description}</p>}{day.activities?.length > 0 && <ul className="mt-2 list-inside list-disc body4 text-text-secondary">{day.activities.map((activity) => <li key={activity}>{activity}</li>)}</ul>}</div></li>)}</ol></section>;
}
