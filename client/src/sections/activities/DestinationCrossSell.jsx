"use client";

import { useState, useMemo } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ExperienceCard from "@/components/shared/ExperienceCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { experiences } from "./data";
import { FiArrowRight, FiMapPin, FiCompass } from "react-icons/fi";
import { cn } from "@/lib/cn";

const topDestinations = [
  { id: "paris", label: "Paris", search: "Paris", slug: "paris" },
  { id: "rome", label: "Rome", search: "Rome", slug: "rome" },
  { id: "bali", label: "Bali", search: "Bali", slug: "bali" },
  { id: "tokyo", label: "Tokyo", search: "Tokyo", slug: "tokyo" },
  { id: "cappadocia", label: "Cappadocia", search: "Cappadocia", slug: "cappadocia" },
  { id: "dubai", label: "Dubai", search: "Dubai", slug: "dubai" },
  { id: "santorini", label: "Santorini", search: "Santorini", slug: "santorini" },
];

export default function DestinationCrossSell() {
  const [activeTab, setActiveTab] = useState(topDestinations[0].id);

  const activeDestination = useMemo(() => {
    return topDestinations.find((d) => d.id === activeTab) || topDestinations[0];
  }, [activeTab]);

  const destinationExperiences = useMemo(() => {
    const list = experiences.filter(
      (e) =>
        e.destination.toLowerCase().includes(activeDestination.search.toLowerCase()) ||
        e.location.toLowerCase().includes(activeDestination.search.toLowerCase())
    );
    if (list.length >= 2) return list.slice(0, 3);
    const others = experiences.filter((e) => !list.includes(e));
    return [...list, ...others].slice(0, 3);
  }, [activeDestination]);

  return (
    <section className="py-14 sm:py-20 bg-gray7/30" id="destination-cross-sell">
      <Container>
        <SectionHeading
          eyebrow="COMPLETE YOUR ITINERARY"
          title={`Staying in ${activeDestination.label}?`}
          text="Enrich your days with guided half-day excursions, artisan food crawls, and skip-the-line access."
          action={
            <div className="flex flex-wrap items-center gap-3">
              <Button
                href={`/tours?destination=${encodeURIComponent(activeDestination.search)}`}
                variant="outline"
                size="sm"
                data-analytics-id={`cross-sell-tours-${activeDestination.slug}`}
                rightIcon={<FiCompass aria-hidden="true" />}
              >
                View multi-day {activeDestination.label} tours
              </Button>
              <Button
                href={`/destinations/${activeDestination.slug}`}
                variant="secondary"
                size="sm"
                data-analytics-id={`cross-sell-dest-${activeDestination.slug}`}
                rightIcon={<FiArrowRight aria-hidden="true" />}
              >
                {activeDestination.label} destination guide
              </Button>
            </div>
          }
        />

        {/* Destination Tabs */}
        <div
          className="no-scrollbar -mx-4 mb-8 flex overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:px-0"
          role="tablist"
          aria-label="Filter activities by destination"
        >
          {topDestinations.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "body4 mr-2 mb-2 inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full px-5 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isActive
                    ? "bg-dark text-white shadow-xs"
                    : "bg-white text-dark hover:bg-gray6 border border-gray6"
                )}
                data-analytics-id={`dest-tab-${tab.id}`}
              >
                <FiMapPin className="mr-1.5 text-accent" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Experiences Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinationExperiences.map((item) => (
            <ExperienceCard key={item.id} experience={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
