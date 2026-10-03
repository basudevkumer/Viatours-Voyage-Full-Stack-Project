"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/shared/Container";
import { cn } from "@/lib/cn";

export default function GuideCategories({ categories = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const handleSelect = (cat) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    const qs = params.toString();
    router.push(`/travel-guide${qs ? `?${qs}` : ""}#guides`);

    const el = document.getElementById("guides");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="border-b border-gray6 bg-white py-4" aria-label="Filter guides by topic">
      <Container>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="caption shrink-0 font-medium text-text-secondary pr-2">
            Explore topic:
          </span>
          {categories.map((cat) => {
            const isSelected =
              activeCategory.toLowerCase() === cat.title.toLowerCase() ||
              (activeCategory === "All" && cat.title === "All");

            return (
              <button
                key={cat.title}
                type="button"
                onClick={() => handleSelect(cat.title)}
                className={cn(
                  "body5 inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isSelected
                    ? "border-accent bg-accent text-white shadow-xs font-semibold"
                    : "border-gray5 bg-white text-dark hover:border-accent hover:text-accent"
                )}
                data-analytics-id={`guide-cat-${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span>{cat.title}</span>
                <span
                  className={cn(
                    "caption rounded-full px-2 py-0.5 text-xs font-semibold",
                    isSelected ? "bg-white/20 text-white" : "bg-gray6 text-text-secondary"
                  )}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
