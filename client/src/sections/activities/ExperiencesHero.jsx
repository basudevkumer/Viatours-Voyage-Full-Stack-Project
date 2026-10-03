"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import { trendingDestinations } from "@/sections/activities/data";
import { FiSearch, FiMapPin, FiCalendar, FiCheckCircle, FiShield, FiSmartphone } from "react-icons/fi";

const destinationList = [
  "All destinations",
  "Paris",
  "Cappadocia",
  "Phuket",
  "London",
  "Dubai",
  "Santorini",
  "Barcelona",
  "Maldives",
  "Bali",
  "Tokyo",
  "Rome",
  "Singapore",
];

export default function ExperiencesHero() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [destination, setDestination] = useState("All destinations");
  const [travelDate, setTravelDate] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (destination && destination !== "All destinations") params.set("destination", destination);
    if (travelDate) params.set("date", travelDate);

    const queryStr = params.toString();
    router.push(`/activities${queryStr ? `?${queryStr}` : ""}#discover`);

    const el = document.getElementById("discover");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageHero
      eyebrow="LOCAL ACTIVITIES & DAY EXCURSIONS"
      title="Make your journey more than a destination."
      text="Discover immersive food walks, hidden sea caves, night-time monuments, and authentic local workshops hosted by verified native guides."
      media={{
        src: trendingDestinations[4].image,
        alt: "Travelers enjoying a scenic Bali activity",
        caption: "Explore destinations through local eyes.",
      }}
      actions={
        <div className="w-full">
          {/* Functional Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="rounded-2xl bg-white p-3 sm:p-4 shadow-xl text-dark"
            role="search"
            aria-label="Search experiences"
          >
            <div className="grid gap-3 sm:grid-cols-12 sm:items-center">
              {/* Keyword / Activity */}
              <div className="sm:col-span-4 relative">
                <label htmlFor="hero-exp-search" className="sr-only">
                  Activity keyword
                </label>
                <div className="relative flex items-center">
                  <FiSearch className="absolute left-3.5 text-accent" size={18} aria-hidden="true" />
                  <input
                    id="hero-exp-search"
                    type="search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="What do you feel like doing?"
                    className="body4 min-h-[46px] w-full rounded-xl border border-gray5 bg-white pl-10 pr-3 py-2 text-dark focus:border-accent focus:outline-none"
                    data-analytics-id="hero-exp-keyword"
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="sm:col-span-4 relative">
                <label htmlFor="hero-exp-dest" className="sr-only">
                  Destination
                </label>
                <div className="relative flex items-center">
                  <FiMapPin className="absolute left-3.5 text-accent" size={18} aria-hidden="true" />
                  <select
                    id="hero-exp-dest"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="body4 min-h-[46px] w-full rounded-xl border border-gray5 bg-white pl-10 pr-8 py-2 text-dark focus:border-accent focus:outline-none"
                    data-analytics-id="hero-exp-destination"
                  >
                    {destinationList.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="sm:col-span-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <label htmlFor="hero-exp-date" className="sr-only">
                    Select travel date
                  </label>
                  <DatePicker
                    id="hero-exp-date"
                    label=""
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="!bg-white !min-h-[46px]"
                    placeholder="When?"
                    data-analytics-id="hero-exp-date"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="shrink-0 min-h-[46px] px-5"
                  data-analytics-id="hero-search-submit"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          {/* Factual Reassurance Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="caption flex items-center gap-1.5 text-white/90">
              <FiCheckCircle className="text-accent" aria-hidden="true" />
              Free cancellation on qualifying activities
            </span>
            <span className="caption flex items-center gap-1.5 text-white/90">
              <FiSmartphone className="text-accent" aria-hidden="true" />
              Instant mobile ticket confirmation
            </span>
            <span className="caption flex items-center gap-1.5 text-white/90">
              <FiShield className="text-accent" aria-hidden="true" />
              Verified native local hosts
            </span>
          </div>
        </div>
      }
    />
  );
}
