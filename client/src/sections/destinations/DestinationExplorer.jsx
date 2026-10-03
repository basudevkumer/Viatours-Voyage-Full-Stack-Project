"use client";

import { useMemo, useState } from "react";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import DestinationCard from "@/components/shared/DestinationCard";
import FilterPanel from "@/components/shared/FilterPanel";
import ResultsHeader from "@/components/shared/ResultsHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import useFilters from "@/hooks/useFilters";
import { destinationsData, regions } from "./data";
import { FiFilter, FiCompass } from "react-icons/fi";

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "alpha", label: "Alphabetical (A–Z)" },
  { value: "tours", label: "Most tours available" },
  { value: "price-low", label: "Lowest starting price" },
  { value: "price-high", label: "Highest starting price" },
];

const styleOptions = [
  { value: "all", label: "All travel styles" },
  { value: "Beach", label: "Beach & Coastal" },
  { value: "Culture", label: "Culture & Heritage" },
  { value: "Adventure", label: "Adventure & Outdoors" },
  { value: "City break", label: "Iconic City Breaks" },
  { value: "Luxury", label: "Luxury & Private" },
  { value: "Nature", label: "Nature & Wildlife" },
];

const monthOptions = [
  { value: "all", label: "Any travel month" },
  { value: "Jan", label: "January" },
  { value: "Feb", label: "February" },
  { value: "Mar", label: "March" },
  { value: "Apr", label: "April" },
  { value: "May", label: "May" },
  { value: "Jun", label: "June" },
  { value: "Jul", label: "July" },
  { value: "Aug", label: "August" },
  { value: "Sep", label: "September" },
  { value: "Oct", label: "October" },
  { value: "Nov", label: "November" },
  { value: "Dec", label: "December" },
];

export default function DestinationExplorer() {
  const defaults = {
    search: "",
    region: "all",
    travelStyle: "all",
    bestMonth: "all",
    maxBudget: 500,
  };

  const { values, setFilter, clearFilters } = useFilters(defaults);
  const [sort, setSort] = useState("recommended");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const regionOptions = regions.map((r) => ({
    value: r.id,
    label: r.label,
  }));

  const filterConfig = [
    {
      key: "search",
      type: "search",
      label: "Search destinations",
      placeholder: "City, country, or region...",
    },
    {
      key: "region",
      type: "select",
      label: "Region",
      defaultValue: "all",
      options: regionOptions,
    },
    {
      key: "travelStyle",
      type: "select",
      label: "Travel style",
      defaultValue: "all",
      options: styleOptions,
    },
    {
      key: "bestMonth",
      type: "select",
      label: "Best travel month",
      defaultValue: "all",
      options: monthOptions,
    },
    {
      key: "maxBudget",
      type: "range",
      label: "Max starting price",
      min: 40,
      max: 500,
      step: 20,
      format: (val) => `$${val}`,
    },
  ];

  // Filtering & Sorting
  const filtered = useMemo(() => {
    let list = [...destinationsData];

    if (values.search) {
      const q = values.search.toLowerCase().trim();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          d.tagline.toLowerCase().includes(q)
      );
    }

    if (values.region && values.region !== "all") {
      list = list.filter((d) => d.region.toLowerCase() === values.region.toLowerCase());
    }

    if (values.travelStyle && values.travelStyle !== "all") {
      list = list.filter((d) =>
        d.travelStyles.some((s) => s.toLowerCase() === values.travelStyle.toLowerCase())
      );
    }

    if (values.bestMonth && values.bestMonth !== "all") {
      list = list.filter((d) =>
        d.bestMonths.some((m) => m.toLowerCase() === values.bestMonth.toLowerCase())
      );
    }

    if (values.maxBudget) {
      list = list.filter((d) => d.startingPrice <= Number(values.maxBudget));
    }

    if (sort === "alpha") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "tours") {
      list.sort((a, b) => b.toursCount - a.toursCount);
    } else if (sort === "price-low") {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sort === "price-high") {
      list.sort((a, b) => b.startingPrice - a.startingPrice);
    }

    return list;
  }, [values, sort]);

  const activeFilterCount = Object.entries(values).filter(
    ([k, v]) => v !== defaults[k] && v !== "all" && v !== ""
  ).length;

  return (
    <Section bg="grey" spacing="md" id="explorer" className="scroll-mt-24">
      <SectionHeading
        eyebrow="GLOBAL EXPLORER"
        title="Find your ideal destination"
        text="Filter 16 curated regions by geography, seasonal climate, travel vibe, or budget."
      />

      {/* Mobile filter toggle bar */}
      <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
        <Button
          variant="outline"
          leftIcon={<FiFilter aria-hidden="true" />}
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          aria-controls="destinations-filter-sheet"
          className="relative"
          data-analytics-id="destinations-filter-mobile-open"
        >
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <ResultsHeader
          count={filtered.length}
          noun="destinations"
          sortOptions={sortOptions}
          sortValue={sort}
          onSortChange={setSort}
          className="mb-0 flex-1 justify-end"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Desktop Sidebar Filter Panel */}
        <FilterPanel
          config={filterConfig}
          values={values}
          onChange={(key, val) => setFilter(key, val)}
          onClear={clearFilters}
          className="hidden lg:block h-fit"
          title="Filter destinations"
        />

        {/* Results Area */}
        <div>
          <ResultsHeader
            count={filtered.length}
            noun="destinations"
            sortOptions={sortOptions}
            sortValue={sort}
            onSortChange={setSort}
            className="hidden lg:flex"
          />

          {filtered.length > 0 ? (
            <>
              {/* Responsive Destination Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
                {filtered.slice(0, visibleCount).map((dest) => (
                  <div key={dest.id} className="flex flex-col">
                    <DestinationCard
                      image={dest.image}
                      name={dest.name}
                      tours={`${dest.toursCount} tours · From $${dest.startingPrice}`}
                      href={`/destinations/${dest.slug}`}
                      className="h-[190px] sm:h-[210px] lg:h-[230px]"
                      data-analytics-id={`explorer-card-${dest.slug}`}
                    />
                  </div>
                ))}
              </div>

              {/* Show more pagination */}
              {visibleCount < filtered.length && (
                <div className="mt-10 text-center">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    data-analytics-id="destinations-show-more"
                  >
                    Show more destinations ({filtered.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={<FiCompass aria-hidden="true" />}
              title="No destinations match your filters"
              text="Try clearing one or more filters to broaden your search, or request a custom itinerary from our specialists."
              action={
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                  <Button href="#plan-my-trip" variant="primary" size="sm">
                    Tell us where you want to go
                  </Button>
                </div>
              }
            />
          )}
        </div>
      </div>

      {/* Mobile Filter BottomSheet */}
      <FilterPanel
        mobile
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="Filter destinations"
        config={filterConfig}
        values={values}
        onChange={(key, val) => setFilter(key, val)}
        onClear={clearFilters}
        onApply={() => setMobileOpen(false)}
        resultCount={`${filtered.length} destinations`}
      />
    </Section>
  );
}
