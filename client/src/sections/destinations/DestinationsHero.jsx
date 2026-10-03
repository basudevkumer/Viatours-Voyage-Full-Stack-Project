"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FiCheckCircle, FiHeadphones, FiMapPin, FiCalendar, FiUsers, FiSearch } from "react-icons/fi";
import allImages from "@/components/helper/imageProvider";

const heroReassurances = [
  { id: "cancel", icon: FiCheckCircle, text: "Free cancellation on selected tours" },
  { id: "guides", icon: FiMapPin, text: "Verified native local guides" },
  { id: "support", icon: FiHeadphones, text: "24/7 dedicated traveler support" },
];

export default function DestinationsHero() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [month, setMonth] = useState("");
  const [travelers, setTravelers] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (month.trim()) params.set("bestMonth", month.trim());
    router.push(`/destinations?${params.toString()}#explorer`);
  };

  return (
    <PageHero
      eyebrow="CURATED GLOBAL DESTINATIONS"
      title="Find your place in the world."
      text="Explore 16 handpicked regions vetted for cultural richness, verified native guides, and exceptional travel pacing."
      media={{
        src: allImages.trendingDestinations[15].image, // Santorini
        caption: "Santorini caldera at sunset, Greece",
        alt: "Santorini cliffside village",
      }}
      className="pb-10 pt-28 sm:pt-32 lg:pt-36"
    >
      <div className="mb-6">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
          className="text-white/70 [&_a]:text-white/80 [&_a:hover]:text-accent"
        />
      </div>

      {/* ONE PRIMARY ACTION: Destination SearchBar */}
      <form
        onSubmit={handleSearch}
        className="mt-6 grid w-full max-w-[760px] gap-1 rounded-2xl bg-white p-2.5 shadow-2xl sm:grid-cols-[1.5fr_1fr_1fr_auto] sm:gap-2 sm:rounded-full sm:p-2"
        role="search"
        aria-label="Search destinations"
      >
        <label className="flex items-center gap-2.5 rounded-xl px-3 py-2 sm:rounded-full" htmlFor="dest-hero-keyword">
          <FiMapPin aria-hidden="true" className="text-accent shrink-0 text-base" />
          <span className="sr-only">Destination or city</span>
          <input
            id="dest-hero-keyword"
            name="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Where do you want to go?"
            className="body4 w-full min-w-0 bg-transparent text-dark placeholder:text-text-secondary focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-2.5 border-t border-gray6 px-3 py-2 sm:border-l sm:border-t-0" htmlFor="dest-hero-month">
          <FiCalendar aria-hidden="true" className="text-accent shrink-0 text-base" />
          <span className="sr-only">Travel month</span>
          <input
            id="dest-hero-month"
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="When? (e.g. May)"
            className="body4 w-full min-w-0 bg-transparent text-dark placeholder:text-text-secondary focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-2.5 border-t border-gray6 px-3 py-2 sm:border-l sm:border-t-0" htmlFor="dest-hero-travelers">
          <FiUsers aria-hidden="true" className="text-accent shrink-0 text-base" />
          <span className="sr-only">Travelers</span>
          <input
            id="dest-hero-travelers"
            name="travelers"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            placeholder="Travelers"
            className="body4 w-full min-w-0 bg-transparent text-dark placeholder:text-text-secondary focus:outline-none"
          />
        </label>

        <button
          type="submit"
          data-analytics-id="destinations-hero-search-submit"
          className="title4 mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-6 py-3 text-white transition-colors hover:bg-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:mt-0 sm:rounded-full"
        >
          <FiSearch aria-hidden="true" size={16} />
          <span>Explore</span>
        </button>
      </form>

      {/* 3 Short Factual Reassurance Badges */}
      <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80" aria-label="Booking reassurances">
        {heroReassurances.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="body5 flex items-center gap-1.5 font-medium">
              <Icon aria-hidden="true" className="text-accent shrink-0" />
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
    </PageHero>
  );
}
