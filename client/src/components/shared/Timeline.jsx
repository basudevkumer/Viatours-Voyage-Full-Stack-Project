import { cn } from "@/lib/cn";

/**
 * Reusable data-driven Timeline component.
 * Safely renders null if items array is empty.
 */
export default function Timeline({ items = [], className }) {
  if (!items || !items.length) {
    return null;
  }

  return (
    <div className={cn("relative border-l border-gray5 pl-6 ml-4 space-y-8", className)}>
      {items.map((item, index) => (
        <div key={item.id || index} className="relative group">
          {/* Node marker */}
          <div
            aria-hidden="true"
            className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-white bg-accent shadow-xs transition-transform group-hover:scale-125"
          />

          <span className="caption block font-bold text-accent">
            {item.date || item.year}
          </span>
          <h4 className="title3 mt-1 text-dark">{item.title}</h4>
          {item.description && (
            <p className="body4 mt-1.5 text-text-secondary">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
