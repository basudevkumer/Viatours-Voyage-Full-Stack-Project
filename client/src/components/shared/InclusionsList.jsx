import { FiCheck, FiX } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function InclusionsList({ included = [], excluded = [], className }) {
  if (!included.length && !excluded.length) return null;
  return <section className={cn("rounded-2xl border border-gray6 bg-white p-5 sm:p-7", className)}><h2 className="title1 text-dark">What’s included</h2><div className="mt-4 grid gap-5 sm:grid-cols-2">{included.length > 0 && <ul className="grid content-start gap-3">{included.map((item) => <li key={item} className="body4 flex items-start gap-2 text-dark"><FiCheck aria-hidden="true" className="mt-0.5 shrink-0 text-success" />{item}</li>)}</ul>}{excluded.length > 0 && <div><h3 className="title4 mb-3 text-dark">Not included</h3><ul className="grid gap-3">{excluded.map((item) => <li key={item} className="body4 flex items-start gap-2 text-text-secondary"><FiX aria-hidden="true" className="mt-0.5 shrink-0 text-error" />{item}</li>)}</ul></div>}</div></section>;
}
