"use client";
import Container from "@/components/shared/Container";
import { useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import TourFilters from "@/components/shared/TourFilters";
import { tours } from "./data";

const TourDiscovery = () => {
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
  const sortControl = <select value={sort} onChange={(event) => setSort(event.target.value)} className="body4 rounded-lg border border-gray5 bg-white px-3 py-2 text-dark outline-none"><option value="recommended">Recommended</option><option value="rating">Highest rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select>;

  return <section id="discover" className="scroll-mt-24 py-14 sm:py-20"><Container>
    <SectionHeading eyebrow="CHOOSE YOUR WAY TO GO" title="Tours made for your kind of travel" text="Search less, discover more. Compare trusted experiences and find the one that feels like you." />
    <div className="mb-7 flex items-center justify-between gap-3 lg:hidden"><button type="button" onClick={() => setMobileFilters(true)} className="title4 inline-flex items-center gap-2 rounded-xl border border-gray5 bg-white px-4 py-3 text-dark"><FiFilter /> Filters</button>{sortControl}</div>
    <div className="grid gap-8 lg:grid-cols-[245px_1fr]"><aside className="hidden rounded-2xl border border-gray6 bg-white p-5 lg:block"><TourFilters filters={filters} setFilters={setFilters} destinations={destinations} categories={categories} /></aside><div><div className="mb-6 hidden items-center justify-between lg:flex"><p className="body3 text-text-secondary"><span className="font-semibold text-dark">{filteredTours.length}</span> experiences found</p>{sortControl}</div>{filteredTours.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filteredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)}</div> : <div className="rounded-2xl border border-gray6 bg-white p-10 text-center"><h3 className="title1 text-dark">No tours match those filters</h3><p className="body3 mt-2 text-text-secondary">Try broadening your search or clearing a filter.</p></div>}</div></div>
  </Container>{mobileFilters && <div className="fixed inset-0 z-[60] lg:hidden"><button type="button" aria-label="Close filter panel" onClick={() => setMobileFilters(false)} className="absolute inset-0 bg-dark/50" /><div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl"><TourFilters filters={filters} setFilters={setFilters} destinations={destinations} categories={categories} mobile onClose={() => setMobileFilters(false)} /><button type="button" onClick={() => setMobileFilters(false)} className="title4 mt-7 w-full rounded-xl bg-dark py-4 text-white">Show {filteredTours.length} tours</button></div></div>}</section>;
};
export default TourDiscovery;
