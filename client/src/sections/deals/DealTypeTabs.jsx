"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/shared/Container";
import { cn } from "@/lib/cn";

export default function DealTypeTabs({ counts = { all: 0, tours: 0, experiences: 0 } }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "all";

  const tabs = [
    { key: "all", label: "All deals", count: counts.all },
    { key: "tours", label: "Multi-day tours", count: counts.tours },
    { key: "experiences", label: "Day experiences", count: counts.experiences },
  ];

  const handleTabChange = (typeKey) => {
    const params = new URLSearchParams(searchParams.toString());
    if (typeKey === "all") {
      params.delete("type");
    } else {
      params.set("type", typeKey);
    }
    // Reset page to 1 on tab switch
    params.delete("page");

    const query = params.toString();
    const url = `${pathname}${query ? `?${query}` : ""}#deals`;
    router.replace(url, { scroll: false });
  };

  return (
    <section className="border-b border-gray6 bg-white py-4" aria-label="Deal category filter">
      <Container>
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-1 sm:gap-3">
          <span className="body5 mr-2 shrink-0 font-semibold uppercase tracking-wider text-text-secondary sm:body4">
            Filter offers:
          </span>
          <div role="tablist" aria-label="Deals type selection" className="flex items-center gap-2">
            {tabs.map((tab) => {
              const active = currentType === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  type="button"
                  id={`tab-${tab.key}`}
                  aria-controls="deals"
                  aria-selected={active}
                  onClick={() => handleTabChange(tab.key)}
                  data-analytics-id={`deal-tab-${tab.key}`}
                  className={cn(
                    "flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    active
                      ? "border-accent bg-accent text-white shadow-xs"
                      : "border-gray5 bg-bg-card text-dark hover:border-gray4 hover:bg-gray7/60"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                      active
                        ? "bg-white/20 text-white"
                        : "bg-gray6 text-text-secondary"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
