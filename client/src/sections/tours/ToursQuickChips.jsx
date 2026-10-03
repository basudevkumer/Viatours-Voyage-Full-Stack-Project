"use client";

import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import { FiCheckCircle } from "react-icons/fi";

const quickChips = [
  { label: "All Tours", key: "reset", value: "" },
  { label: "City Breaks", key: "category", value: "City Breaks" },
  { label: "Cultural", key: "category", value: "Cultural" },
  { label: "Adventure", key: "category", value: "Adventure" },
  { label: "Beach Escapes", key: "category", value: "Beach Escapes" },
  { label: "Short (1–3 Days)", key: "duration", value: "2-5" },
  { label: "Extended (6+ Days)", key: "duration", value: "6+" },
  { label: "Under $200", key: "maxPrice", value: "200" },
  { label: "Free Cancellation", key: "freeCancellation", value: "true", icon: FiCheckCircle },
];

export default function ToursQuickChips() {
  const router = useRouter();

  const handleChipClick = (chip) => {
    if (chip.key === "reset") {
      router.push("/tours#discover");
    } else {
      router.push(`/tours?${chip.key}=${encodeURIComponent(chip.value)}#discover`);
    }

    const el = document.getElementById("discover");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="border-b border-gray6 bg-white py-4" aria-label="Quick tour filters">
      <Container>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="caption shrink-0 font-medium text-text-secondary pr-1">
            Quick filters:
          </span>
          {quickChips.map((chip) => {
            const Icon = chip.icon;
            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="body5 inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border border-gray5 bg-white px-4 py-2 font-medium text-dark transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                data-analytics-id={`tours-chip-${chip.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              >
                {Icon && <Icon className="text-accent" aria-hidden="true" />}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
