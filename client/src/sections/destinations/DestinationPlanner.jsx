"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import useDestinationMatch from "@/hooks/useDestinationMatch";
import { FiCompass, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { cn } from "@/lib/cn";

const styleOptions = [
  { id: "any", label: "Any style" },
  { id: "Beach", label: "Beach & Coast" },
  { id: "Culture", label: "Culture & History" },
  { id: "Adventure", label: "Active & Adventure" },
  { id: "City break", label: "City & Urban" },
  { id: "Luxury", label: "Luxury & Relax" },
];

const monthOptions = [
  { id: "any", label: "Flexible" },
  { id: "Apr", label: "Spring (Apr–May)" },
  { id: "Jul", label: "Summer (Jun–Aug)" },
  { id: "Sep", label: "Autumn (Sep–Nov)" },
  { id: "Dec", label: "Winter (Dec–Feb)" },
];

const budgetOptions = [
  { id: "any", label: "Any budget" },
  { id: "value", label: "Value (under $100/day)" },
  { id: "moderate", label: "Moderate ($100–$250/day)" },
  { id: "luxury", label: "Premium ($250+/day)" },
];

export default function DestinationPlanner() {
  const [travelStyle, setTravelStyle] = useState("any");
  const [month, setMonth] = useState("any");
  const [budget, setBudget] = useState("any");

  const matchedDestinations = useDestinationMatch({ budget, travelStyle, month });

  return (
    <Section bg="white" spacing="md" id="planner">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="QUICK TRIP MATCHMAKER"
          title="Not sure where to go? Let us help narrow it down"
          text="Answer 3 quick preferences to see real destination matches based on climate, style, and travel budget. No algorithms or artificial claims—just factual regional curation."
          align="center"
        />

        {/* 3 Questions Container */}
        <div className="mb-8 rounded-2xl border border-gray6 bg-gray7/60 p-5 sm:p-7">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Question 1: Style */}
            <div>
              <label htmlFor="planner-style-select" className="title4 mb-2 block text-dark">
                1. What is your travel style?
              </label>
              <select
                id="planner-style-select"
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="body4 min-h-11 w-full rounded-xl border border-gray5 bg-white px-3 py-2.5 text-dark focus:border-accent focus:outline-none"
                data-analytics-id="planner-style-change"
              >
                {styleOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Question 2: Month */}
            <div>
              <label htmlFor="planner-month-select" className="title4 mb-2 block text-dark">
                2. When do you want to travel?
              </label>
              <select
                id="planner-month-select"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="body4 min-h-11 w-full rounded-xl border border-gray5 bg-white px-3 py-2.5 text-dark focus:border-accent focus:outline-none"
                data-analytics-id="planner-month-change"
              >
                {monthOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Question 3: Budget */}
            <div>
              <label htmlFor="planner-budget-select" className="title4 mb-2 block text-dark">
                3. What is your budget pace?
              </label>
              <select
                id="planner-budget-select"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="body4 min-h-11 w-full rounded-xl border border-gray5 bg-white px-3 py-2.5 text-dark focus:border-accent focus:outline-none"
                data-analytics-id="planner-budget-change"
              >
                {budgetOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Matched Destinations Preview */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="title3 text-dark flex items-center gap-2">
              <FiCompass className="text-accent" aria-hidden="true" />
              <span>Recommended destinations for you</span>
            </h3>
            <span className="caption text-text-secondary">
              Showing top {matchedDestinations.length} matches
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {matchedDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray6 bg-white transition-all hover:shadow-md"
              >
                <div className="relative h-36 w-full overflow-hidden bg-gray5">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge variant="light" className="absolute left-2.5 top-2.5 shadow-xs">
                    {dest.region}
                  </Badge>
                  <div className="absolute bottom-2 right-2 rounded-md bg-dark/80 px-2 py-0.5 text-xs font-semibold text-white">
                    From ${dest.startingPrice}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-1">
                    <h4 className="title4 text-dark">{dest.name}</h4>
                    <p className="caption text-text-secondary">{dest.country}</p>
                  </div>
                  <p className="body5 mb-3 line-clamp-2 text-text-secondary">{dest.tagline}</p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-gray6 pt-2.5">
                    <span className="caption text-text-secondary">{dest.toursCount} tours</span>
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="body5 inline-flex min-h-[44px] items-center gap-1 font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      data-analytics-id={`planner-dest-${dest.slug}`}
                    >
                      View details <FiArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Lead Prompt Box */}
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <FiCheckCircle className="text-accent" aria-hidden="true" />
                <h4 className="title3 text-dark">Want a free custom itinerary proposal?</h4>
              </div>
              <p className="body4 max-w-xl text-text-secondary">
                Tell us your preferred dates and party size. Our destination coordinators will draft a suggested route, hotels, and tours—completely free with zero obligation.
              </p>
            </div>
            <Button
              href="#plan-my-trip"
              variant="primary"
              size="md"
              className="shrink-0"
              data-analytics-id="planner-cta-plan-trip"
            >
              Get free trip suggestion
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
