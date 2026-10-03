"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import Button from "@/components/ui/Button";
import { GUIDE_CATEGORIES } from "./data";
import { FiSearch, FiCompass, FiMapPin, FiCalendar } from "react-icons/fi";
import allImages from "@/components/helper/imageProvider";

export default function TravelGuideHero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    router.push(`/travel-guide?q=${encodeURIComponent(searchTerm.trim())}#guides`);
    const el = document.getElementById("guides");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleChipClick = (cat) => {
    router.push(`/travel-guide?category=${encodeURIComponent(cat)}#guides`);
    const el = document.getElementById("guides");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageHero
      eyebrow="FIELD-TESTED INSIGHTS"
      title="Practical guides to help you choose where to go & what to do"
      text="Curated neighborhood walks, transit secrets, pacing advice, and seasonal tips compiled by native guides and coordinators."
      media={{
        src: allImages.trendingDestinations[2].image,
        alt: "Historic European city alleyway bathed in morning sunlight",
        caption: "Explore honest local perspectives before you book.",
      }}
      actions={
        <div className="w-full space-y-4">
          {/* Functional Guide Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-2xl bg-white p-2 shadow-xl sm:p-2.5 max-w-xl"
            role="search"
            aria-label="Search travel guides"
          >
            <div className="relative flex flex-1 items-center">
              <FiSearch className="absolute left-3.5 text-accent" size={18} aria-hidden="true" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city, safari, food walk, or tips..."
                className="body4 min-h-[46px] w-full rounded-xl border-0 bg-transparent pl-10 pr-3 py-2 text-dark focus:outline-none"
                data-analytics-id="hero-guide-search-input"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="shrink-0 min-h-[46px]"
              data-analytics-id="hero-guide-search-submit"
            >
              Search guides
            </Button>
          </form>

          {/* Quick Popular Topic Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="caption text-white/80 font-medium mr-1">Popular topics:</span>
            {GUIDE_CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleChipClick(cat)}
                className="caption rounded-full border border-white/20 bg-white/10 px-3 py-1 font-medium text-white transition-colors hover:bg-white hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                data-analytics-id={`hero-chip-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      }
    />
  );
}
