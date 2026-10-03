"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FilterPanel from "@/components/shared/FilterPanel";
import ResultsHeader from "@/components/shared/ResultsHeader";
import DealCard from "@/components/shared/DealCard";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import Chip from "@/components/ui/Chip";
import useFilters from "@/hooks/useFilters";
import { getDeals } from "@/services/dealService";
import { FiFilter, FiX, FiTag, FiCalendar } from "react-icons/fi";

const defaultFilters = {
  search: "",
  destination: "all",
  category: "all",
  minSavings: "all",
  maxPrice: "400",
  month: "all",
  freeCancellation: "",
};

const sortOptions = [
  { value: "savings", label: "Biggest saving" },
  { value: "price-asc", label: "Lowest price" },
  { value: "rating", label: "Highest rated" },
  { value: "ending-soon", label: "Ending soonest" },
];

const minSavingsOptions = [
  { value: "all", label: "Any saving" },
  { value: "15", label: "$15 or more" },
  { value: "25", label: "$25 or more" },
  { value: "40", label: "$40 or more" },
];

const monthOptions = [
  { value: "all", label: "All travel months" },
  { value: "oct", label: "October 2026" },
  { value: "nov", label: "November 2026" },
  { value: "dec", label: "December 2026" },
];

export default function DealsDiscovery({
  initialDestinations = [],
  initialCategories = [],
}) {
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || "all";

  const { values, setFilter, clearFilters } = useFilters(defaultFilters);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("savings");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const effectiveDestination = searchParams.get("destination") || values.destination;

  // Fetch deals whenever filters, sort, or type tab change
  useEffect(() => {
    let active = true;

    getDeals({
      type: currentType,
      destination: effectiveDestination,
      category: values.category,
      minSavings: values.minSavings,
      maxPrice: values.maxPrice,
      month: values.month,
      freeCancellation: values.freeCancellation,
      sort,
      page: 1,
      pageSize: 50,
    })
      .then((res) => {
        if (!active) return;
        if (res.success) {
          let list = res.data;
          // Apply client-side search query if user typed into search input
          if (values.search && values.search.trim()) {
            const q = values.search.toLowerCase().trim();
            list = list.filter(
              (d) =>
                d.title.toLowerCase().includes(q) ||
                d.destination.toLowerCase().includes(q) ||
                d.location.toLowerCase().includes(q) ||
                d.category.toLowerCase().includes(q)
            );
          }
          setDeals(list);
        }
      })
      .catch((err) => {
        console.error("Failed to load deals:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [currentType, values, sort, effectiveDestination]);

  // Dynamic filter options from data
  const destinationOptions = useMemo(() => {
    return initialDestinations.map((d) => ({
      value: d.name,
      label: `${d.name} (${d.count})`,
    }));
  }, [initialDestinations]);

  const categoryOptions = useMemo(() => {
    return initialCategories.map((c) => ({
      value: c.name,
      label: `${c.name} (${c.count})`,
    }));
  }, [initialCategories]);

  // Active filter count for mobile badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (values.search) count += 1;
    if (values.destination && values.destination !== "all") count += 1;
    if (values.category && values.category !== "all") count += 1;
    if (values.minSavings && values.minSavings !== "all") count += 1;
    if (values.maxPrice && values.maxPrice !== defaultFilters.maxPrice) count += 1;
    if (values.month && values.month !== "all") count += 1;
    if (values.freeCancellation) count += 1;
    return count;
  }, [values]);

  const filterConfig = [
    {
      key: "search",
      type: "search",
      label: "Search offers",
      placeholder: "City, tour title, style...",
      analyticsId: "deals-filter-search",
    },
    {
      key: "destination",
      type: "select",
      label: "Destination",
      allLabel: "All destinations",
      options: destinationOptions,
      analyticsId: "deals-filter-destination",
    },
    {
      key: "category",
      type: "select",
      label: "Travel Category",
      allLabel: "All categories",
      options: categoryOptions,
      analyticsId: "deals-filter-category",
    },
    {
      key: "minSavings",
      type: "select",
      label: "Minimum savings",
      allLabel: "Any savings amount",
      options: minSavingsOptions,
      analyticsId: "deals-filter-savings",
    },
    {
      key: "month",
      type: "select",
      label: "Travel Month",
      allLabel: "All upcoming months",
      options: monthOptions,
      analyticsId: "deals-filter-month",
    },
    {
      key: "maxPrice",
      type: "range",
      label: "Maximum Price",
      min: 50,
      max: 400,
      step: 10,
      format: (val) => `$${val}`,
      analyticsId: "deals-filter-price",
    },
    {
      key: "freeCancellation",
      type: "chips",
      label: "Flexibility",
      options: [{ label: "Free cancellation only", value: "true" }],
      analyticsId: "deals-filter-cancellation",
    },
  ];

  const visibleDeals = deals.slice(0, visibleCount);
  const hasMore = visibleCount < deals.length;

  return (
    <section className="scroll-mt-24 py-12 sm:py-16 lg:py-20" id="deals">
      <Container>
        <SectionHeading
          eyebrow="EXPLORE VERIFIED OFFERS"
          title="Current discounted departures"
          text="Browse confirmed reduced rates across premier destinations. Transparent terms, authentic savings, and verified previous prices."
        />

        {/* Mobile Filter Toggle & Sort Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 lg:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileOpen(true)}
            data-analytics-id="deals-mobile-filters-trigger"
            leftIcon={<FiFilter aria-hidden="true" />}
            className="flex items-center gap-2"
          >
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>

          <span className="body4 font-medium text-text-secondary">
            {deals.length} {deals.length === 1 ? "offer" : "offers"}
          </span>
        </div>

        {/* Applied Filter Chips Bar */}
        {activeFilterCount > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl bg-gray7/60 p-3">
            <span className="caption mr-1 font-semibold text-text-secondary">
              Applied filters:
            </span>
            {values.destination && values.destination !== "all" && (
              <Chip
                selected
                onClick={() => setFilter("destination", "all")}
                className="bg-white text-dark shadow-xs"
              >
                {values.destination} <FiX className="ml-1 inline" aria-hidden="true" />
              </Chip>
            )}
            {values.category && values.category !== "all" && (
              <Chip
                selected
                onClick={() => setFilter("category", "all")}
                className="bg-white text-dark shadow-xs"
              >
                {values.category} <FiX className="ml-1 inline" aria-hidden="true" />
              </Chip>
            )}
            {values.minSavings && values.minSavings !== "all" && (
              <Chip
                selected
                onClick={() => setFilter("minSavings", "all")}
                className="bg-white text-dark shadow-xs"
              >
                Save ${values.minSavings}+ <FiX className="ml-1 inline" aria-hidden="true" />
              </Chip>
            )}
            {values.month && values.month !== "all" && (
              <Chip
                selected
                onClick={() => setFilter("month", "all")}
                className="bg-white text-dark shadow-xs"
              >
                Month: {values.month} <FiX className="ml-1 inline" aria-hidden="true" />
              </Chip>
            )}
            {values.freeCancellation && (
              <Chip
                selected
                onClick={() => setFilter("freeCancellation", "")}
                className="bg-white text-dark shadow-xs"
              >
                Free cancellation <FiX className="ml-1 inline" aria-hidden="true" />
              </Chip>
            )}
            {values.maxPrice && values.maxPrice !== defaultFilters.maxPrice && (
              <Chip
                selected
                onClick={() => setFilter("maxPrice", defaultFilters.maxPrice)}
                className="bg-white text-dark shadow-xs"
              >
                Under ${values.maxPrice} <FiX className="ml-1 inline" aria-hidden="true" />
              </Chip>
            )}
            <button
              type="button"
              onClick={clearFilters}
              data-analytics-id="deals-clear-all-chips"
              className="caption ml-auto text-accent underline hover:text-dark focus-visible:outline-none"
            >
              Reset all
            </button>
          </div>
        )}

        {/* Main 2-column Layout (Sidebar Filters + Cards Grid) */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel
                config={filterConfig}
                values={values}
                onChange={setFilter}
                onClear={activeFilterCount > 0 ? clearFilters : undefined}
                title="Filter Deals"
                className="shadow-xs"
              />
            </div>
          </div>

          {/* Results Area */}
          <div>
            <ResultsHeader
              count={deals.length}
              noun={currentType === "all" ? "deals" : currentType}
              sortOptions={sortOptions}
              sortValue={sort}
              onSortChange={(val) => {
                setSort(val);
                setVisibleCount(9);
              }}
              className="hidden lg:flex"
            />

            {/* Loading State Skeletons */}
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col space-y-3 rounded-2xl border border-gray6 p-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="mt-4 flex justify-between pt-4">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : deals.length > 0 ? (
              <>
                {/* Responsive Deal Grid: 1 col (<640), 2 col (640-1279), 3 col (>=1280) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleDeals.map((deal) => (
                    <DealCard key={deal.dealId} deal={deal} />
                  ))}
                </div>

                {/* Pagination / Show More */}
                {hasMore && (
                  <div className="mt-10 flex flex-col items-center gap-2">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      data-analytics-id="deals-load-more"
                      className="min-w-[180px]"
                    >
                      Show more deals ({deals.length - visibleCount} remaining)
                    </Button>
                    <span className="caption text-text-secondary">
                      Showing {visibleDeals.length} of {deals.length} verified offers
                    </span>
                  </div>
                )}
              </>
            ) : (
              /* Dual Empty State Variants */
              activeFilterCount > 0 ? (
                /* Variant (b): Filters matched nothing */
                <EmptyState
                  icon={<FiFilter aria-hidden="true" />}
                  title="No deals match these exact filters"
                  text="Try clearing one or more filters, or set up a custom deal alert for your preferred destination and budget."
                  action={
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <Button
                        variant="secondary"
                        onClick={clearFilters}
                        data-analytics-id="deals-empty-clear-filters"
                      >
                        Clear all filters
                      </Button>
                      <Button
                        href="#deal-alerts"
                        variant="outline"
                        data-analytics-id="deals-empty-prefill-alerts"
                      >
                        Set deal alert
                      </Button>
                    </div>
                  }
                />
              ) : (
                /* Variant (a): No deals at all */
                <EmptyState
                  icon={<FiTag aria-hidden="true" />}
                  title="No live deals in this category right now"
                  text="We only publish verified promotional rates directly agreed with our local operators. Subscribe to deal alerts to be notified when genuine offers open."
                  action={
                    <Button
                      href="#deal-alerts"
                      variant="primary"
                      data-analytics-id="deals-empty-get-alerts"
                    >
                      Get deal alerts
                    </Button>
                  }
                />
              )
            )}
          </div>
        </div>

        {/* Mobile Filter BottomSheet */}
        <FilterPanel
          mobile
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          config={filterConfig}
          values={values}
          onChange={setFilter}
          onClear={clearFilters}
          onApply={() => setMobileOpen(false)}
          resultCount={deals.length}
          title="Filter Deals"
        />
      </Container>
    </section>
  );
}
