"use client";

import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import FilterPanel from "@/components/shared/FilterPanel";
import ResultsHeader from "@/components/shared/ResultsHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import useFilters from "@/hooks/useFilters";
import { useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { tours } from "./data";

export default function TourDiscovery() {
  const defaults = { search: "", destination: "all", category: "all", maxPrice: "900" };
  const { values, setFilter, clearFilters } = useFilters(defaults);
  const [sort, setSort] = useState("recommended");
  const [mobileOpen, setMobileOpen] = useState(false);
  const destinations = [...new Set(tours.map((tour) => tour.location))];
  const categories = [...new Set(tours.map((tour) => tour.category))];
  const config = [{ key: "search", type: "search", label: "Search tours", placeholder: "Search by destination" }, { key: "destination", type: "select", label: "Destination", defaultValue: "all", options: destinations }, { key: "category", type: "select", label: "Travel style", defaultValue: "all", options: categories }, { key: "maxPrice", type: "range", label: "Maximum price", min: 99, max: 900, step: 25, format: (value) => `$${value}` }];
  const filtered = useMemo(() => {
    const result = tours.filter((tour) => (!values.search || `${tour.title} ${tour.location} ${tour.category}`.toLowerCase().includes(values.search.toLowerCase())) && (values.destination === "all" || tour.location === values.destination) && (values.category === "all" || tour.category === values.category) && Number(tour.price) <= Number(values.maxPrice));
    return result.sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : 0);
  }, [values, sort]);
  const sortOptions = [{ value: "recommended", label: "Recommended" }, { value: "rating", label: "Highest rated" }, { value: "price-low", label: "Price: low to high" }, { value: "price-high", label: "Price: high to low" }];
  const onChange = (key, value) => setFilter(key, value);
  return <section id="discover" className="scroll-mt-24 py-14 sm:py-20"><Container><SectionHeading eyebrow="CHOOSE YOUR WAY TO GO" title="Tours made for your kind of travel" text="Search less, discover more. Compare trusted experiences and find the one that feels like you." /><div className="mb-5 flex items-center justify-between lg:hidden"><Button variant="outline" leftIcon={<FiFilter />} onClick={() => setMobileOpen(true)} aria-expanded={mobileOpen} aria-controls="tour-filter-sheet">Filters</Button><ResultsHeader count={filtered.length} noun="tours" sortOptions={sortOptions} sortValue={sort} onSortChange={setSort} className="mb-0 flex-1 justify-end" /></div><div className="grid gap-8 lg:grid-cols-[245px_1fr]"><FilterPanel config={config} values={values} onChange={onChange} onClear={clearFilters} className="hidden lg:block" /><div><ResultsHeader count={filtered.length} noun="tours" sortOptions={sortOptions} sortValue={sort} onSortChange={setSort} className="hidden lg:flex" />{filtered.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((tour) => <TourCard key={tour.id} tour={tour} />)}</div> : <EmptyState title="No tours match those filters" text="Try broadening your search or clearing a filter." />}</div></div><FilterPanel mobile open={mobileOpen} onClose={() => setMobileOpen(false)} title="Filter tours" config={config} values={values} onChange={onChange} onClear={clearFilters} onApply={() => setMobileOpen(false)} resultCount={`${filtered.length} tours`} /></Container></section>;
}
