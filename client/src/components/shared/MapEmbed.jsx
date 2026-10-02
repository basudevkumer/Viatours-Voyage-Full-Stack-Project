import { FiMapPin } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function MapEmbed({ location, embedUrl, className }) {
  const safeUrl = (() => { try { const url = new URL(embedUrl); return ["https:", "http:"].includes(url.protocol) ? url.href : null; } catch { return null; } })();
  if (!location && !safeUrl) return null;
  return <section aria-label="Location map" className={cn("overflow-hidden rounded-2xl border border-gray6 bg-bg-field", className)}>{safeUrl ? <iframe title={`Map showing ${location || "the meeting point"}`} src={safeUrl} loading="lazy" referrerPolicy="no-referrer" className="h-64 w-full border-0" /> : <div className="flex min-h-48 flex-col items-center justify-center p-6 text-center"><FiMapPin aria-hidden="true" className="text-2xl text-accent" /><p className="title3 mt-2 text-dark">{location}</p><p className="body5 mt-1 text-text-secondary">Map preview unavailable</p></div>}{location && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`} target="_blank" rel="noreferrer" className="title4 inline-flex min-h-11 items-center px-4 text-accent hover:underline">Open location in maps</a>}</section>;
}
