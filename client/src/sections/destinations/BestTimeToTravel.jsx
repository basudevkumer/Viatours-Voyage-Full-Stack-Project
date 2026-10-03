"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { monthGuide, destinationsData } from "./data";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function BestTimeToTravel() {
  const [selectedMonth, setSelectedMonth] = useState("Apr");

  const activeMonthData = useMemo(() => {
    return monthGuide.find((m) => m.id === selectedMonth) || monthGuide[3];
  }, [selectedMonth]);

  const matchingDestinations = useMemo(() => {
    const slugSet = new Set(activeMonthData.destinations);
    return destinationsData.filter((dest) => slugSet.has(dest.slug)).slice(0, 4);
  }, [activeMonthData]);

  return (
    <Section bg="grey" spacing="md" id="best-time">
      <SectionHeading
        eyebrow="SEASONAL TRAVEL GUIDE"
        title="Where to go by month"
        text="Plan around ideal seasonal climates, cultural festivals, and optimal outdoor conditions."
        action={
          <div className="flex items-center gap-1.5 text-text-secondary caption">
            <FiCalendar className="text-accent" aria-hidden="true" />
            <span>Editorial climate guide // TODO(content)</span>
          </div>
        }
      />

      {/* Month Selector Chips */}
      <div
        className="no-scrollbar -mx-4 mb-8 flex overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        role="tablist"
        aria-label="Select month"
      >
        {monthGuide.map((month) => {
          const isActive = month.id === selectedMonth;
          return (
            <button
              key={month.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => setSelectedMonth(month.id)}
              className={cn(
                "body4 mr-2 mb-2 inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full px-4 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isActive
                  ? "bg-accent text-white shadow-xs"
                  : "border border-gray5 bg-white text-dark hover:border-accent hover:text-accent"
              )}
              data-analytics-id={`month-chip-${month.id.toLowerCase()}`}
            >
              {month.label}
            </button>
          );
        })}
      </div>

      {/* Matching destinations grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {matchingDestinations.map((dest) => (
          <div
            key={dest.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-48 w-full overflow-hidden bg-gray5">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge variant="light" className="absolute left-3 top-3 shadow-xs">
                {dest.region}
              </Badge>
              <div className="absolute bottom-3 right-3 rounded-lg bg-dark/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                From ${dest.startingPrice}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <h3 className="title3 text-dark">{dest.name}</h3>
                <span className="caption text-text-secondary">{dest.country}</span>
              </div>
              <p className="body4 mb-4 line-clamp-2 text-text-secondary">{dest.tagline}</p>
              
              <div className="mt-auto flex items-center justify-between border-t border-gray6 pt-3">
                <span className="caption text-text-secondary">{dest.toursCount} experiences</span>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="body4 inline-flex min-h-[44px] items-center gap-1 font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  data-analytics-id={`month-dest-${dest.slug}`}
                >
                  Explore <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          href={`/destinations?bestMonth=${selectedMonth}#explorer`}
          variant="secondary"
          size="sm"
          data-analytics-id="view-all-month-destinations"
        >
          View all destinations recommended for {activeMonthData.label}
        </Button>
      </div>
    </Section>
  );
}
