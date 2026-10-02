"use client";

import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import TourFilters from "@/components/shared/TourFilters";
import BottomSheet from "@/components/ui/BottomSheet";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Select from "@/components/ui/Select";
import { useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { tours } from "./data";

export default function TourDiscovery() {
  const [filters, setFilters] = useState({ search: "", destination: "all", category: "all", maxPrice: 900 });
  const [sort, setSort] = useState("recommended");
  const [mobileFilters, setMobileFilters] = useState(false);
  const destinations = [...new Set(tours.map((tour) => tour.location))];
  const categories = [...new Set(tours.map((tour) => tour.category))];
  const filteredTours = useMemo(() => {
    const result = tours.filter((tour) => {
      const query = filters.search.toLowerCase();
      return (!query || (tour.title + " " + tour.location + " " + tour.category).toLowerCase().includes(query)) && (filters.destination === "all" || tour.location === filters.destination) && (filters.category === "all" || tour.category === filters.category) && Number(tour.price) <= Number(filters.maxPrice);
    });
    return [...result].sort((a, b) => sort === "price-low" ? Number(a.price) - Number(b.price) : sort === "price-high" ? Number(b.price) - Number(a.price) : b.rating - a.rating);
  }, [filters, sort]);
  const sortOptions = <><option value="recommended">Recommended</option><option value="rating">Highest rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></>;

  return <section id="discover" className="scroll-mt-24 py-14 sm:py-20"><Container>
    <SectionHeading eyebrow="CHOOSE YOUR WAY TO GO" title="Tours made for your kind of travel" text="Search less, discover more. Compare trusted experiences and find the one that feels like you." />
    <div className="mb-7 flex items-center justify-between gap-3 lg:hidden"><Button variant="outline" leftIcon={<FiFilter />} onClick={() => setMobileFilters(true)} aria-expanded={mobileFilters} aria-controls="tour-filter-sheet">Filters</Button><Select data-analytics-id="tour-sort" label="Sort tours" labelClassName="sr-only" wrapperClassName="w-auto" className="rounded-lg px-3 py-2" value={sort} onChange={(event) => setSort(event.target.value)}>{sortOptions}</Select></div>
    <div className="grid gap-8 lg:grid-cols-[245px_1fr]"><aside className="hidden rounded-2xl border border-gray6 bg-white p-5 lg:block"><TourFilters filters={filters} setFilters={setFilters} destinations={destinations} categories={categories} /></aside><div><div className="mb-6 hidden items-center justify-between lg:flex"><p className="body3 text-text-secondary"><span className="font-semibold text-dark">{filteredTours.length}</span> experiences found</p><Select data-analytics-id="tour-sort" label="Sort tours" labelClassName="sr-only" wrapperClassName="w-auto" className="rounded-lg px-3 py-2" value={sort} onChange={(event) => setSort(event.target.value)}>{sortOptions}</Select></div>{filteredTours.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filteredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)}</div> : <EmptyState title="No tours match those filters" text="Try broadening your search or clearing a filter." />}</div></div>
  </Container><BottomSheet open={mobileFilters} onClose={() => setMobileFilters(false)} title="Filter tours" className="!max-w-lg" overlayClassName="items-end p-0 lg:hidden"><div id="tour-filter-sheet"><TourFilters filters={filters} setFilters={setFilters} destinations={destinations} categories={categories} /><Button variant="secondary" fullWidth className="mt-6" onClick={() => setMobileFilters(false)}>Show {filteredTours.length} tours</Button></div></BottomSheet></section>;
}
