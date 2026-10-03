"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import Chip from "@/components/ui/Chip";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

const categories = ["All", "Cultural", "Beach Escapes", "Adventure", "City Breaks", "Nature"];

export default function FeaturedTours({ initialTours = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return initialTours.slice(0, 8);
    return initialTours.filter((tour) => tour.category === selectedCategory).slice(0, 8);
  }, [initialTours, selectedCategory]);

  return (
    <Section bg="white" spacing="md" id="featured-tours">
      <SectionHeading
        eyebrow="HANDCRAFTED ITINERARIES"
        title="Featured tours"
        text="Handpicked small-group and private itineraries with verified native guides and flexible terms."
        action={
          <Button
            href="/tours"
            variant="outline"
            size="sm"
            data-analytics-id="featured-tours-browse-all"
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            Browse all tours
          </Button>
        }
      />

      {/* Quick category filter chips */}
      <div
        className="mb-8 flex flex-wrap items-center gap-2 overflow-x-auto pb-2 sm:mb-10"
        role="group"
        aria-label="Filter tours by category"
      >
        {categories.map((cat) => (
          <Chip
            key={cat}
            selected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
            className="text-xs sm:text-sm"
            data-analytics-id={`featured-tours-filter-${cat.toLowerCase().replaceAll(" ", "-")}`}
          >
            {cat}
          </Chip>
        ))}
      </div>

      {/* Responsive TourCard Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((tour) => (
          <TourCard key={tour.id || tour.title} tour={tour} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/tours"
          data-analytics-id="featured-tours-browse-all-mobile"
          className="title4 inline-flex items-center gap-1.5 text-dark hover:text-accent"
        >
          Browse all tours <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
