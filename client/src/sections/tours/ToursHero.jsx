"use client";

import { useRouter } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import SearchBar from "@/components/shared/SearchBar";
import { trendingDestinations } from "./data";
import { FiCheckCircle, FiShield, FiHeadphones } from "react-icons/fi";

export default function ToursHero() {
  const router = useRouter();

  const handleSearch = ({ query }) => {
    if (query) {
      router.push(`/tours?search=${encodeURIComponent(query)}#discover`);
    } else {
      const el = document.getElementById("discover");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageHero
      eyebrow="HANDCRAFTED GLOBAL ITINERARIES"
      title="Find your perfect journey."
      text="Discover verified guided tours, authentic cultural walks, and multi-day explorations with transparent pricing and native local guides."
      media={{
        src: trendingDestinations[7].image,
        alt: "Hot air balloons over Cappadocia landscape",
        caption: "Curated experiences across 16 global destinations.",
      }}
      actions={
        <div className="w-full">
          <div className="mb-4">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by city, country or activity..."
              data-analytics-id="tours-hero-search-submit"
            />
          </div>

          {/* Factual Reassurance Badges */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
            <span className="caption flex items-center gap-1.5 text-white/90">
              <FiCheckCircle className="text-accent" aria-hidden="true" />
              Free cancellation on qualifying tours
            </span>
            <span className="caption flex items-center gap-1.5 text-white/90">
              <FiShield className="text-accent" aria-hidden="true" />
              100% verified local guides
            </span>
            <span className="caption flex items-center gap-1.5 text-white/90">
              <FiHeadphones className="text-accent" aria-hidden="true" />
              24/7 human traveler support
            </span>
          </div>
        </div>
      }
    />
  );
}
