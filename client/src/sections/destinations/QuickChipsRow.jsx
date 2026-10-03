"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/shared/Container";
import Chip from "@/components/ui/Chip";

const quickPicks = [
  { label: "All Destinations", key: "region", value: "all" },
  { label: "Europe", key: "region", value: "Europe" },
  { label: "Asia", key: "region", value: "Asia" },
  { label: "Middle East", key: "region", value: "Middle East" },
  { label: "Beach & Coastal", key: "travelStyle", value: "Beach" },
  { label: "Cultural Heritage", key: "travelStyle", value: "Culture" },
  { label: "Adventure & Nature", key: "travelStyle", value: "Adventure" },
  { label: "Spring (Apr–May)", key: "bestMonth", value: "May" },
  { label: "Autumn (Sep–Oct)", key: "bestMonth", value: "Oct" },
];

export default function QuickChipsRow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/destinations?${params.toString()}#explorer`, { scroll: true });
  };

  return (
    <div className="border-b border-gray6 bg-white py-3.5 shadow-xs">
      <Container>
        <div className="flex items-center gap-3">
          <span className="body5 hidden font-medium uppercase tracking-[1px] text-text-secondary sm:inline whitespace-nowrap">
            Quick filter:
          </span>

          {/* Horizontally scrollable row with touch affordance */}
          <div
            className="flex flex-1 items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar"
            role="group"
            aria-label="Quick destination filters"
          >
            {quickPicks.map((pick) => {
              const currentVal = searchParams.get(pick.key) || "all";
              const isSelected =
                pick.value === "all" ? currentVal === "all" : currentVal.toLowerCase() === pick.value.toLowerCase();

              return (
                <Chip
                  key={pick.label}
                  selected={isSelected}
                  onClick={() => handleSelect(pick.key, pick.value)}
                  className="whitespace-nowrap text-xs !py-1.5 !px-3.5 sm:text-sm"
                  data-analytics-id={`quick-chip-${pick.key}-${pick.value.toLowerCase()}`}
                >
                  {pick.label}
                </Chip>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
