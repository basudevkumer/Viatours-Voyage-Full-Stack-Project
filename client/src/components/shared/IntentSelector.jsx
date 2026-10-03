"use client";

import {
  FiCompass,
  FiUsers,
  FiLifeBuoy,
  FiBriefcase,
  FiHelpCircle,
  FiPhoneCall,
  FiTag,
  FiMap,
  FiCalendar,
  FiEdit3,
} from "react-icons/fi";
import { cn } from "@/lib/cn";

export const INTENT_OPTIONS = [
  {
    id: "trip",
    label: "Plan a trip",
    tag: "Custom",
    icon: FiCompass,
    summary: "Bespoke itinerary design",
  },
  {
    id: "group",
    label: "Group travel",
    tag: "8+ guests",
    icon: FiUsers,
    summary: "Family, corporate & events",
  },
  {
    id: "booking-support",
    label: "Booking support",
    tag: "Existing",
    icon: FiLifeBuoy,
    summary: "Reservations & adjustments",
  },
  {
    id: "partner",
    label: "Partner with us",
    tag: "Operators",
    icon: FiBriefcase,
    summary: "Guides, hosts & agencies",
  },
  {
    id: "question",
    label: "General question",
    tag: "Information",
    icon: FiHelpCircle,
    summary: "Catalog, policies & advice",
  },
  {
    id: "call",
    label: "Request a call",
    tag: "Phone slot",
    icon: FiPhoneCall,
    summary: "Speak with a specialist",
  },
];

// Fallback metadata for external campaign intents
const EXTERNAL_INTENTS = {
  "deal-alert": { label: "Deal alert", tag: "Special Offer", icon: FiTag, summary: "Price drop subscription" },
  "guide-trip": { label: "Guide itinerary", tag: "Curated", icon: FiMap, summary: "Itinerary from guide" },
  dayplan: { label: "Day plan inquiry", tag: "Single Day", icon: FiCalendar, summary: "Customized day schedule" },
  contributor: { label: "Editorial pitch", tag: "Author", icon: FiEdit3, summary: "Travel guide submission" },
};

export default function IntentSelector({
  activeIntent = "trip",
  onChangeIntent,
  className,
}) {
  // If user arrived with an external intent not in default 6, include it
  const isExternal = activeIntent in EXTERNAL_INTENTS;
  const items = isExternal
    ? [
        ...INTENT_OPTIONS,
        {
          id: activeIntent,
          ...EXTERNAL_INTENTS[activeIntent],
        },
      ]
    : INTENT_OPTIONS;

  return (
    <div
      role="tablist"
      aria-label="Select inquiry purpose"
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isSelected = activeIntent === item.id;

        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            id={`intent-tab-${item.id}`}
            aria-selected={isSelected}
            aria-controls="lead-form-panel"
            onClick={() => onChangeIntent?.(item.id)}
            data-analytics-id={`contact-intent-${item.id}`}
            className={cn(
              "group relative flex min-h-[76px] flex-col justify-between rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isSelected
                ? "border-accent bg-accent/5 ring-1 ring-accent shadow-xs"
                : "border-gray6 bg-white hover:border-gray5 hover:bg-gray7/50 text-text-secondary hover:text-dark"
            )}
          >
            <div className="flex items-center justify-between gap-1">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                  isSelected
                    ? "bg-accent text-white"
                    : "bg-bg-field text-text-secondary group-hover:text-dark"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  isSelected
                    ? "bg-accent/15 text-accent"
                    : "bg-gray7 text-text-muted"
                )}
              >
                {item.tag}
              </span>
            </div>

            <div className="mt-2">
              <div
                className={cn(
                  "text-xs font-bold leading-tight transition-colors sm:text-sm",
                  isSelected ? "text-dark" : "text-text-secondary group-hover:text-dark"
                )}
              >
                {item.label}
              </div>
              <div className="mt-0.5 truncate text-[11px] text-text-muted">
                {item.summary}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
