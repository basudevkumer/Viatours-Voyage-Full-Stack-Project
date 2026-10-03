"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ExperienceCard from "@/components/shared/ExperienceCard";
import FilterPanel from "@/components/shared/FilterPanel";
import ResultsHeader from "@/components/shared/ResultsHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Skeleton from "@/components/ui/Skeleton";
import useFilters from "@/hooks/useFilters";
import { getExperiences } from "@/services/experienceService";
import { FiFilter, FiX } from "react-icons/fi";

const defaultFilters = {
  search: "",
  destination: "all",
  category: "all",
  timeOfDay: "all",
  duration: "all",
  maxPrice: "120",
  feature: "all",
};

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest rated" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "duration", label: "Shortest duration" },
];

export default function ExperienceDiscovery() {
  const { values, setFilter, clearFilters } = useFilters(defaultFilters);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [sort, setSort] = useState("recommended");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    let active = true;
    getExperiences()
      .then((result) => {
        if (!active) return;
        if (result.success) setExperiences(result.data);
        else setLoadError(result.message);
      })
      .catch((error) => {
        if (active) setLoadError(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const destinationOptions = useMemo(() => {
    return Array.from(new Set(experiences.map((e) => e.destination || e.location))).sort();
  }, [experiences]);

  const categoryOptions = useMemo(() => {
    return Array.from(new Set(experiences.map((e) => e.category))).sort();
  }, [experiences]);

  const config = [
    {
      key: "search",
      type: "search",
      label: "Search activities",
      placeholder: "City, sight or experience...",
      analyticsId: "filter-exp-search",
    },
    {
      key: "destination",
      type: "select",
      label: "Destination",
      defaultValue: "all",
      allLabel: "All destinations",
      options: destinationOptions,
      analyticsId: "filter-exp-destination",
    },
    {
      key: "category",
      type: "select",
      label: "Interest",
      defaultValue: "all",
      allLabel: "All interests",
      options: categoryOptions,
      analyticsId: "filter-exp-category",
    },
    {
      key: "timeOfDay",
      type: "select",
      label: "Time of day",
      defaultValue: "all",
      allLabel: "Any time of day",
      options: [
        { label: "Morning", value: "morning" },
        { label: "Afternoon", value: "afternoon" },
        { label: "Evening & Night", value: "evening" },
        { label: "Full day", value: "full-day" },
      ],
      analyticsId: "filter-exp-time-of-day",
    },
    {
      key: "duration",
      type: "select",
      label: "Duration",
      defaultValue: "all",
      allLabel: "Any duration",
      options: [
        { label: "Under 4 hours", value: "short" },
        { label: "Half day (4–6 hours)", value: "medium" },
        { label: "Full day (6+ hours)", value: "full-day" },
      ],
      analyticsId: "filter-exp-duration",
    },
    {
      key: "maxPrice",
      type: "range",
      label: "Maximum price per person",
      min: 35,
      max: 120,
      step: 5,
      format: (val) => `$${val}`,
      analyticsId: "filter-exp-price-range",
    },
    {
      key: "feature",
      type: "select",
      label: "Included feature",
      defaultValue: "all",
      allLabel: "Any features",
      options: [
        { label: "Free cancellation", value: "freeCancellation" },
        { label: "Hotel pickup", value: "hotelPickup" },
        { label: "Instant confirmation", value: "instantConfirmation" },
      ],
      analyticsId: "filter-exp-feature",
    },
  ];

  const filtered = useMemo(() => {
    let result = experiences.filter((item) => {
      // Search
      if (values.search) {
        const q = values.search.toLowerCase().trim();
        const text = `${item.title} ${item.location} ${item.destination} ${item.category}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      // Destination
      if (values.destination && values.destination !== "all") {
        const d = values.destination.toLowerCase();
        if (item.destination?.toLowerCase() !== d && !item.location.toLowerCase().includes(d)) {
          return false;
        }
      }

      // Category
      if (values.category && values.category !== "all") {
        if (item.category?.toLowerCase() !== values.category.toLowerCase()) {
          return false;
        }
      }

      // Time of Day
      if (values.timeOfDay && values.timeOfDay !== "all") {
        if (item.timeOfDay?.toLowerCase() !== values.timeOfDay.toLowerCase()) {
          return false;
        }
      }

      // Duration
      if (values.duration && values.duration !== "all") {
        if (values.duration === "short" && item.durationHours > 3.5) return false;
        if (values.duration === "medium" && (item.durationHours <= 3.5 || item.durationHours > 6)) return false;
        if (values.duration === "full-day" && item.durationHours <= 6) return false;
      }

      // Max price
      if (values.maxPrice && Number(item.price) > Number(values.maxPrice)) {
        return false;
      }

      // Feature
      if (values.feature && values.feature !== "all") {
        if (!item.features?.includes(values.feature)) return false;
      }

      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sort === "price-low" || sort === "price") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating || b.reviews - a.reviews;
      if (sort === "duration") return a.durationHours - b.durationHours;
      // Default: featured first, then rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }, [experiences, values, sort]);

  // Compute active chips for badges
  const activeChips = useMemo(() => {
    const chips = [];
    if (values.search) chips.push({ key: "search", label: `Search: "${values.search}"` });
    if (values.destination && values.destination !== "all") chips.push({ key: "destination", label: `In: ${values.destination}` });
    if (values.category && values.category !== "all") chips.push({ key: "category", label: `Interest: ${values.category}` });
    if (values.timeOfDay && values.timeOfDay !== "all") {
      const timeLabels = { morning: "Morning", afternoon: "Afternoon", evening: "Evening", "full-day": "Full day" };
      chips.push({ key: "timeOfDay", label: timeLabels[values.timeOfDay] || values.timeOfDay });
    }
    if (values.duration && values.duration !== "all") {
      const durLabels = { short: "< 4 hours", medium: "4–6 hours", "full-day": "Full day" };
      chips.push({ key: "duration", label: durLabels[values.duration] || values.duration });
    }
    if (values.maxPrice && Number(values.maxPrice) < 120) chips.push({ key: "maxPrice", label: `Under $${values.maxPrice}` });
    if (values.feature && values.feature !== "all") {
      const featLabels = { freeCancellation: "Free cancellation", hotelPickup: "Hotel pickup", instantConfirmation: "Instant confirm" };
      chips.push({ key: "feature", label: featLabels[values.feature] || values.feature });
    }
    return chips;
  }, [values]);

  const removeChip = (key) => {
    setFilter(key, defaultFilters[key]);
  };

  const paginatedExperiences = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  return (
    <section id="discover" className="scroll-mt-24 py-14 sm:py-20 bg-gray7/40">
      <Container>
        <SectionHeading
          eyebrow="HANDPICKED SHORT ACTIVITIES"
          title="Things to do where you're going"
          text="Compare authentic experiences by destination, timing, and interest. Real verified local hosts with instant confirmation."
        />

        {/* Mobile Filter Toggle & Results Count */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 lg:hidden">
          <Button
            variant="outline"
            leftIcon={<FiFilter aria-hidden="true" />}
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="experience-filter-sheet"
            data-analytics-id="exp-mobile-filter-open"
          >
            Filters {activeChips.length > 0 && `(${activeChips.length})`}
          </Button>

          <ResultsHeader
            count={filtered.length}
            noun="experiences"
            sortOptions={sortOptions}
            sortValue={sort}
            onSortChange={setSort}
            className="mb-0 flex-1 justify-end"
          />
        </div>

        {/* Active Filter Chips Bar */}
        {activeChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2" role="region" aria-label="Active experience filters">
            <span className="caption font-medium text-text-secondary">Applied:</span>
            {activeChips.map((chip) => (
              <span
                key={chip.key}
                className="body5 inline-flex items-center gap-1.5 rounded-full border border-gray5 bg-white px-3 py-1 text-dark shadow-xs"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={() => removeChip(chip.key)}
                  aria-label={`Remove filter ${chip.label}`}
                  className="rounded-full p-0.5 text-text-secondary hover:bg-gray6 hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <FiX size={14} aria-hidden="true" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={clearFilters}
              className="caption font-semibold text-accent hover:underline ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              data-analytics-id="exp-clear-all-chips"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Main Grid: Sidebar + Results */}
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop Filter Panel */}
          <FilterPanel
            config={config}
            values={values}
            onChange={(key, val) => setFilter(key, val)}
            onClear={clearFilters}
            className="hidden lg:block self-start shadow-xs sticky top-28"
            title="Refine experiences"
          />

          {/* Results Area */}
          <div>
            <ResultsHeader
              count={filtered.length}
              noun="experiences"
              sortOptions={sortOptions}
              sortValue={sort}
              onSortChange={setSort}
              className="hidden lg:flex"
            />

            {loadError ? (
              <ErrorState text={loadError} />
            ) : loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, id) => (
                  <Skeleton key={id} className="h-96 rounded-2xl" />
                ))}
              </div>
            ) : filtered.length ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedExperiences.map((item) => (
                    <ExperienceCard key={item.id} experience={item} />
                  ))}
                </div>

                {/* Show More Button */}
                {visibleCount < filtered.length && (
                  <div className="mt-10 text-center">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      data-analytics-id="exp-show-more"
                    >
                      Show more experiences ({filtered.length - visibleCount} remaining)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-gray6 bg-white p-8">
                <EmptyState
                  title="No experiences match those filters"
                  text="Try broadening your criteria, or request a custom private activity in your destination."
                  action={
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button variant="secondary" onClick={clearFilters} data-analytics-id="exp-empty-clear">
                        Clear all filters
                      </Button>
                      <Button href="#custom-experience-inquiry" variant="primary" data-analytics-id="exp-empty-lead-cta">
                        Tell us what you want to do
                      </Button>
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Sheet */}
        <FilterPanel
          mobile
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          title="Filter experiences"
          config={config}
          values={values}
          onChange={(key, val) => setFilter(key, val)}
          onClear={clearFilters}
          onApply={() => setMobileOpen(false)}
          resultCount={`${filtered.length} experiences`}
        />
      </Container>
    </section>
  );
}
