import { cn } from "@/lib/cn";
export default function EmptyState({ icon, title, text, action, className }) {
  return <div className={cn("rounded-2xl border border-gray6 bg-white p-8 text-center sm:p-10", className)}>{icon && <div className="mb-3 flex justify-center text-2xl text-text-secondary" aria-hidden="true">{icon}</div>}<h3 className="title1 text-dark">{title}</h3>{text && <p className="body3 mt-2 text-text-secondary">{text}</p>}{action && <div className="mt-5">{action}</div>}</div>;
}
