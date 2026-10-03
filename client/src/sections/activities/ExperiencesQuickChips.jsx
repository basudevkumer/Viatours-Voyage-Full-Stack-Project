"use client";

import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import { FiSun, FiMoon, FiClock, FiCheckCircle, FiTruck, FiZap } from "react-icons/fi";

const quickChips = [
  { label: "All Activities", key: "reset", value: "" },
  { label: "Morning Starts", key: "timeOfDay", value: "morning", icon: FiSun },
  { label: "Afternoon", key: "timeOfDay", value: "afternoon", icon: FiSun },
  { label: "After Dark & Evening", key: "timeOfDay", value: "evening", icon: FiMoon },
  { label: "Under 4 Hours", key: "duration", value: "short", icon: FiClock },
  { label: "Free Cancellation", key: "feature", value: "freeCancellation", icon: FiCheckCircle },
  { label: "Hotel Pickup Included", key: "feature", value: "hotelPickup", icon: FiTruck },
  { label: "Instant Confirmation", key: "feature", value: "instantConfirmation", icon: FiZap },
  { label: "Under $60", key: "maxPrice", value: "60" },
];

export default function ExperiencesQuickChips() {
  const router = useRouter();

  const handleChipClick = (chip) => {
    if (chip.key === "reset") {
      router.push("/activities#discover");
    } else {
      router.push(`/activities?${chip.key}=${encodeURIComponent(chip.value)}#discover`);
    }

    const el = document.getElementById("discover");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="border-b border-gray6 bg-white py-4" aria-label="Quick experience filters">
      <Container>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="caption shrink-0 font-medium text-text-secondary pr-1">
            Filter by:
          </span>
          {quickChips.map((chip) => {
            const Icon = chip.icon;
            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="body5 inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border border-gray5 bg-white px-4 py-2 font-medium text-dark transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                data-analytics-id={`exp-chip-${chip.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
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
