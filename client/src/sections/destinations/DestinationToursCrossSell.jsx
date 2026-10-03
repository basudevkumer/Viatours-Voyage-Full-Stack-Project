"use client";

import { useState, useMemo } from "react";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import Button from "@/components/ui/Button";
import { tours } from "@/sections/tours/data";
import { FiArrowRight } from "react-icons/fi";
import { cn } from "@/lib/cn";

const topDestinationsTabs = [
  { id: "paris", label: "Paris", search: "Paris" },
  { id: "rome", label: "Rome", search: "Rome" },
  { id: "bali", label: "Bali", search: "Bali" },
  { id: "tokyo", label: "Tokyo", search: "Tokyo" },
  { id: "singapore", label: "Singapore", search: "Singapore" },
  { id: "dubai", label: "Dubai", search: "Dubai" },
];

export default function DestinationToursCrossSell() {
  const [activeTab, setActiveTab] = useState(topDestinationsTabs[0].id);

  const activeDestination = useMemo(() => {
    return topDestinationsTabs.find((t) => t.id === activeTab) || topDestinationsTabs[0];
  }, [activeTab]);

  const matchingTours = useMemo(() => {
    const list = tours.filter((t) =>
      t.location.toLowerCase().includes(activeDestination.search.toLowerCase()) ||
      t.title.toLowerCase().includes(activeDestination.search.toLowerCase())
    );
    // If fewer than 2, supplement with first 2 tours so the grid looks balanced
    if (list.length >= 2) return list.slice(0, 3);
    const others = tours.filter((t) => !list.includes(t));
    return [...list, ...others].slice(0, 3);
  }, [activeDestination]);

  return (
    <Section bg="grey" spacing="md" id="popular-tours">
      <SectionHeading
        eyebrow="HANDCRAFTED ITINERARIES"
        title="Popular tours in top destinations"
        text="Sample our highest-rated guided journeys, private walks, and multi-day explorations."
        action={
          <Button
            href={`/tours?location=${encodeURIComponent(activeDestination.search)}`}
            variant="outline"
            size="sm"
            data-analytics-id={`view-all-${activeDestination.id}-tours`}
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            View all {activeDestination.label} tours
          </Button>
        }
      />

      {/* Tabs */}
      <div
        className="no-scrollbar -mx-4 mb-8 flex overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:px-0"
        role="tablist"
        aria-label="Filter tours by destination"
      >
        {topDestinationsTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "title4 mr-2 mb-2 inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl px-5 py-2.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isActive
                  ? "bg-dark text-white shadow-xs"
                  : "bg-white text-dark hover:bg-gray6 border border-gray6"
              )}
              data-analytics-id={`tours-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {matchingTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:hidden">
        <Button
          href={`/tours?location=${encodeURIComponent(activeDestination.search)}`}
          variant="secondary"
          size="sm"
          data-analytics-id={`view-all-${activeDestination.id}-tours-mobile`}
          rightIcon={<FiArrowRight aria-hidden="true" />}
        >
          View all {activeDestination.label} tours
        </Button>
      </div>
    </Section>
  );
}
