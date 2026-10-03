"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import FilterPanel from "@/components/shared/FilterPanel";
import ResultsHeader from "@/components/shared/ResultsHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Skeleton from "@/components/ui/Skeleton";
import useFilters from "@/hooks/useFilters";
import { getTours } from "@/services/tourService";
import { FiFilter, FiX } from "react-icons/fi";

const defaultFilters = {
  search: "",
  destination: "all",
  category: "all",
  duration: "all",
  maxPrice: "900",
  groupType: "all",
  freeCancellation: "",
};

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest rated" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "duration", label: "Duration" },
];

export default function TourDiscovery() {
  const { values, setFilter, clearFilters } = useFilters(defaultFilters);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [sort, setSort] = useState("recommended");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    let active = true;
    getTours()
      .then((result) => {
        if (!active) return;
        if (result.success) setTours(result.data);
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

  // Filter options derived from data
  const destinationOptions = useMemo(() => {
    return Array.from(new Set(tours.map((t) => t.destination || t.location))).sort();
  }, [tours]);

  const categoryOptions = useMemo(() => {
    return Array.from(new Set(tours.map((t) => t.category))).sort();
  }, [tours]);

  const config = [
    {
      key: "search",
      type: "search",
      label: "Search tours",
      placeholder: "City, title or country...",
      analyticsId: "filter-tour-search",
    },
    {
      key: "destination",
      type: "select",
      label: "Destination",
      defaultValue: "all",
      allLabel: "All destinations",
      options: destinationOptions,
      analyticsId: "filter-tour-destination",
    },
    {
      key: "category",
      type: "select",
      label: "Travel style",
      defaultValue: "all",
      allLabel: "All styles",
      options: categoryOptions,
      analyticsId: "filter-tour-category",
    },
    {
      key: "duration",
      type: "select",
      label: "Duration",
      defaultValue: "all",
      allLabel: "Any duration",
      options: [
        { label: "1 day", value: "1" },
        { label: "2–5 days", value: "2-5" },
        { label: "6+ days", value: "6+" },
      ],
      analyticsId: "filter-tour-duration",
    },
    {
      key: "maxPrice",
      type: "range",
      label: "Maximum price per person",
      min: 99,
      max: 900,
      step: 25,
      format: (val) => `$${val}`,
      analyticsId: "filter-tour-price-range",
    },
    {
      key: "groupType",
      type: "select",
      label: "Group type",
      defaultValue: "all",
      allLabel: "All group types",
      options: [
        { label: "Small group", value: "Small group" },
        { label: "Private experience", value: "Private experience" },
      ],
      analyticsId: "filter-tour-group-type",
    },
  ];

  // Filtering and sorting logic
  const filtered = useMemo(() => {
    let result = tours.filter((tour) => {
      // Search
      if (values.search) {
        const q = values.search.toLowerCase().trim();
        const text = `${tour.title} ${tour.location} ${tour.destination} ${tour.country} ${tour.category}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      // Destination
      if (values.destination && values.destination !== "all") {
        const d = values.destination.toLowerCase();
        if (tour.destination?.toLowerCase() !== d && !tour.location.toLowerCase().includes(d)) {
          return false;
        }
      }

      // Category
      if (values.category && values.category !== "all") {
        const cat = values.category.toLowerCase();
        const matchCat = tour.category?.toLowerCase() === cat;
        const matchStyle = tour.travelStyles?.some((s) => s.toLowerCase() === cat);
        if (!matchCat && !matchStyle) return false;
      }

      // Duration
      if (values.duration && values.duration !== "all") {
        if (values.duration === "1" && tour.days > 1) return false;
        if (values.duration === "2-5" && (tour.days < 2 || tour.days > 5)) return false;
        if (values.duration === "6+" && tour.days < 6) return false;
      }

      // Max price
      if (values.maxPrice && Number(tour.price) > Number(values.maxPrice)) {
        return false;
      }

      // Group type
      if (values.groupType && values.groupType !== "all") {
        if (tour.groupType?.toLowerCase() !== values.groupType.toLowerCase()) {
          return false;
        }
      }

      // Free cancellation
      if (values.freeCancellation === "true") {
        if (!tour.cancellationPolicy || !tour.cancellationPolicy.toLowerCase().includes("free")) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating || b.reviews - a.reviews;
      if (sort === "duration") return a.days - b.days;
      // Default: featured first, then rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }, [tours, values, sort]);

  // Compute active filters for chip badges
  const activeChips = useMemo(() => {
    const chips = [];
    if (values.search) {
      chips.push({ key: "search", label: `Search: "${values.search}"` });
    }
    if (values.destination && values.destination !== "all") {
      chips.push({ key: "destination", label: `Destination: ${values.destination}` });
    }
    if (values.category && values.category !== "all") {
      chips.push({ key: "category", label: `Style: ${values.category}` });
    }
    if (values.duration && values.duration !== "all") {
      const durLabel =
        values.duration === "1" ? "1 day" : values.duration === "2-5" ? "2–5 days" : "6+ days";
      chips.push({ key: "duration", label: `Duration: ${durLabel}` });
    }
    if (values.maxPrice && Number(values.maxPrice) < 900) {
      chips.push({ key: "maxPrice", label: `Under $${values.maxPrice}` });
    }
    if (values.groupType && values.groupType !== "all") {
      chips.push({ key: "groupType", label: values.groupType });
    }
    if (values.freeCancellation === "true") {
      chips.push({ key: "freeCancellation", label: "Free cancellation" });
    }
    return chips;
  }, [values]);

  const removeChip = (key) => {
    setFilter(key, defaultFilters[key]);
  };

  const paginatedTours = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  return (
    <section id="discover" className="scroll-mt-24 py-14 sm:py-20 bg-gray7/40">
      <Container>
        <SectionHeading
          eyebrow="CURATED EXPLORATIONS"
          title="Tours crafted for authentic discovery"
          text="Compare verified itineraries, transparent inclusions, and native local guides. Filter by destination, pace, or travel style."
        />

        {/* Mobile Filter Toggle & Results Count */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 lg:hidden">
          <Button
            variant="outline"
            leftIcon={<FiFilter aria-hidden="true" />}
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="tour-filter-sheet"
            data-analytics-id="tours-mobile-filter-open"
          >
            Filters {activeChips.length > 0 && `(${activeChips.length})`}
          </Button>

          <ResultsHeader
            count={filtered.length}
            noun="tours"
            sortOptions={sortOptions}
            sortValue={sort}
            onSortChange={setSort}
            className="mb-0 flex-1 justify-end"
          />
        </div>

        {/* Active Filter Chips Bar */}
        {activeChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2" role="region" aria-label="Active filters">
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
              data-analytics-id="tours-clear-all-chips"
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
            title="Filter tours"
          />

          {/* Results Area */}
          <div>
            <ResultsHeader
              count={filtered.length}
              noun="tours"
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
                  {paginatedTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>

                {/* Show More Button */}
                {visibleCount < filtered.length && (
                  <div className="mt-10 text-center">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      data-analytics-id="tours-show-more"
                    >
                      Show more tours ({filtered.length - visibleCount} remaining)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-gray6 bg-white p-8">
                <EmptyState
                  title="No tours match your current filter selections"
                  text="Try clearing one or more filters, or let our coordinators design a private custom departure for your party."
                  action={
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button variant="secondary" onClick={clearFilters} data-analytics-id="tours-empty-clear">
                        Clear all filters
                      </Button>
                      <Button href="#custom-trip-request" variant="primary" data-analytics-id="tours-empty-lead-cta">
                        Tell us where you want to go
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
          title="Filter tours"
          config={config}
          values={values}
          onChange={(key, val) => setFilter(key, val)}
          onClear={clearFilters}
          onApply={() => setMobileOpen(false)}
          resultCount={`${filtered.length} tours`}
        />
      </Container>
    </section>
  );
}
