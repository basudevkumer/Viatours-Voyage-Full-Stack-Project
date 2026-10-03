"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import BlogCard from "@/components/shared/BlogCard";
import FilterPanel from "@/components/shared/FilterPanel";
import ResultsHeader from "@/components/shared/ResultsHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Skeleton from "@/components/ui/Skeleton";
import useFilters from "@/hooks/useFilters";
import { getGuides } from "@/services/guideService";
import { GUIDE_CATEGORIES } from "./data";
import { FiFilter, FiX } from "react-icons/fi";

const defaultFilters = {
  q: "",
  category: "all",
  destination: "all",
};

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "a-z", label: "Title: A to Z" },
  { value: "z-a", label: "Title: Z to A" },
];

export default function GuideDiscovery() {
  const { values, setFilter, clearFilters } = useFilters(defaultFilters);
  const [allGuides, setAllGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [sort, setSort] = useState("newest");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  // Fetch all guides once on mount
  useEffect(() => {
    let active = true;

    getGuides({ page: 1, pageSize: 100 })
      .then((res) => {
        if (!active) return;
        if (res.success) {
          setAllGuides(res.data);
          setLoadError("");
        } else {
          setLoadError(res.message);
        }
      })
      .catch((err) => {
        if (active) setLoadError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...allGuides];

    if (values.q) {
      const q = values.q.toLowerCase().trim();
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.excerpt.toLowerCase().includes(q) ||
          g.destination?.name.toLowerCase().includes(q) ||
          g.tags?.some((t) => t.toLowerCase().includes(q)) ||
          g.category.toLowerCase().includes(q)
      );
    }

    if (values.category && values.category !== "all") {
      const cat = values.category.toLowerCase().trim();
      list = list.filter((g) => g.category.toLowerCase() === cat);
    }

    if (values.destination && values.destination !== "all") {
      const dest = values.destination.toLowerCase().trim();
      list = list.filter(
        (g) =>
          g.destination?.slug.toLowerCase() === dest ||
          g.destination?.name.toLowerCase().includes(dest)
      );
    }

    list.sort((a, b) => {
      if (sort === "oldest") return new Date(a.publishedAt) - new Date(b.publishedAt);
      if (sort === "a-z") return a.title.localeCompare(b.title);
      if (sort === "z-a") return b.title.localeCompare(a.title);
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });

    return list;
  }, [allGuides, values, sort]);

  const destinationOptions = useMemo(() => {
    return [
      { label: "East Africa", value: "africa-safari" },
      { label: "Paris", value: "paris" },
      { label: "Cappadocia", value: "cappadocia" },
      { label: "Maldives", value: "maldives" },
      { label: "Tokyo", value: "tokyo" },
      { label: "Bangkok", value: "bangkok" },
      { label: "Rome", value: "rome" },
      { label: "Bali", value: "bali" },
      { label: "London", value: "london" },
      { label: "Dubai", value: "dubai" },
      { label: "Singapore", value: "singapore" },
      { label: "Istanbul", value: "istanbul" },
      { label: "Barcelona", value: "barcelona" },
      { label: "Phuket", value: "phuket" },
      { label: "New York", value: "new-york" },
      { label: "Sydney", value: "sydney" },
      { label: "Santorini", value: "santorini" },
    ];
  }, []);

  const config = [
    {
      key: "q",
      type: "search",
      label: "Search articles",
      placeholder: "Topic, city, advice...",
      analyticsId: "guide-filter-search",
    },
    {
      key: "category",
      type: "select",
      label: "Topic category",
      defaultValue: "all",
      allLabel: "All topics",
      options: GUIDE_CATEGORIES.map((c) => ({ label: c, value: c.toLowerCase() })),
      analyticsId: "guide-filter-category",
    },
    {
      key: "destination",
      type: "select",
      label: "Destination",
      defaultValue: "all",
      allLabel: "All destinations",
      options: destinationOptions,
      analyticsId: "guide-filter-destination",
    },
  ];

  const activeChips = useMemo(() => {
    const chips = [];
    if (values.q) chips.push({ key: "q", label: `Search: "${values.q}"` });
    if (values.category && values.category !== "all") {
      chips.push({ key: "category", label: `Category: ${values.category}` });
    }
    if (values.destination && values.destination !== "all") {
      const match = destinationOptions.find((d) => d.value === values.destination);
      chips.push({ key: "destination", label: `In: ${match ? match.label : values.destination}` });
    }
    return chips;
  }, [values, destinationOptions]);

  const removeChip = (key) => {
    setFilter(key, defaultFilters[key]);
  };

  const paginatedGuides = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  return (
    <section id="guides" className="scroll-mt-24 py-14 sm:py-20 bg-gray7/40">
      <Container>
        <SectionHeading
          eyebrow="BROWSE THE ARCHIVE"
          title="All travel guides & field notes"
          text="Search by destination or theme to discover honest, actionable guidance for planning your next trip."
        />

        {/* Mobile Filter Toggle & Results Count */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 lg:hidden">
          <Button
            variant="outline"
            leftIcon={<FiFilter aria-hidden="true" />}
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="guide-filter-sheet"
            data-analytics-id="guide-mobile-filter-open"
          >
            Filter guides {activeChips.length > 0 && `(${activeChips.length})`}
          </Button>

          <ResultsHeader
            count={filtered.length}
            noun="guides"
            sortOptions={sortOptions}
            sortValue={sort}
            onSortChange={setSort}
            className="mb-0 flex-1 justify-end"
          />
        </div>

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2" role="region" aria-label="Active guide filters">
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
              data-analytics-id="guide-clear-all-chips"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Layout: Sidebar + Grid */}
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop Filter Panel */}
          <FilterPanel
            config={config}
            values={values}
            onChange={(key, val) => setFilter(key, val)}
            onClear={clearFilters}
            className="hidden lg:block self-start shadow-xs sticky top-28"
            title="Refine guides"
          />

          {/* Results Grid Area */}
          <div>
            <ResultsHeader
              count={filtered.length}
              noun="guides"
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
                  <Skeleton key={id} className="h-80 rounded-2xl" />
                ))}
              </div>
            ) : filtered.length ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedGuides.map((guide) => (
                    <BlogCard
                      key={guide.id}
                      image={guide.coverImage}
                      category={guide.category}
                      date={guide.publishedAt}
                      author={guide.author?.name}
                      title={guide.title}
                      excerpt={guide.excerpt}
                      href={`/travel-guide/${guide.slug}`}
                      className="border border-gray6 shadow-xs transition-transform hover:-translate-y-1"
                    />
                  ))}
                </div>

                {/* Show More Pagination */}
                {visibleCount < filtered.length && (
                  <div className="mt-10 text-center">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      data-analytics-id="guide-show-more"
                    >
                      Show more guides ({filtered.length - visibleCount} remaining)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-gray6 bg-white p-8">
                <EmptyState
                  title="No guides found matching those criteria"
                  text="Try clearing your search query or selecting a broader category."
                  action={
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Button variant="secondary" onClick={clearFilters} data-analytics-id="guide-empty-clear">
                        Clear all filters
                      </Button>
                      <Button href="#plan-my-trip" variant="primary" data-analytics-id="guide-empty-lead-cta">
                        Tell us what you&apos;re looking for
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
          title="Filter travel guides"
          config={config}
          values={values}
          onChange={(key, val) => setFilter(key, val)}
          onClear={clearFilters}
          onApply={() => setMobileOpen(false)}
          resultCount={`${filtered.length} guides`}
        />
      </Container>
    </section>
  );
}
