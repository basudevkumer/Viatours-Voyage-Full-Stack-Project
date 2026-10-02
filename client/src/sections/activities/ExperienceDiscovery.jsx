"use client";

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
import { useEffect, useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { getExperiences } from "@/services/experienceService";

export default function ExperienceDiscovery() {
  const defaults = { destination: "all", category: "all" };
  const { values, setFilter, clearFilters } = useFilters(defaults);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [sort, setSort] = useState("recommended");
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { let active = true; getExperiences().then((result) => { if (!active) return; if (result.success) setExperiences(result.data); else setLoadError(result.message); }).catch((error) => { if (active) setLoadError(error.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  const destinations = [...new Set(experiences.map((item) => item.destination))];
  const categories = [...new Set(experiences.map((item) => item.category))];
  const config = [{ key: "destination", type: "select", label: "Destination", defaultValue: "all", options: destinations }, { key: "category", type: "select", label: "Interest", defaultValue: "all", options: categories }];
  const visible = useMemo(() => experiences.filter((item) => (values.destination === "all" || item.destination === values.destination) && (values.category === "all" || item.category === values.category)).sort((a, b) => sort === "price" ? a.price - b.price : sort === "rating" ? b.rating - a.rating : 0), [experiences, values, sort]);
  const sortOptions = [{ value: "recommended", label: "Recommended" }, { value: "rating", label: "Highest rated" }, { value: "price", label: "Price: low to high" }];
  const onChange = (key, value) => setFilter(key, value);
  return <section id="discover" className="scroll-mt-24 py-14 sm:py-20"><Container><SectionHeading eyebrow="FIND SOMETHING MEMORABLE" title="Things to do where you're going" text="Compare experiences by destination, interest and rating before you decide." /><div className="mb-5 flex items-center justify-between lg:hidden"><Button variant="outline" leftIcon={<FiFilter />} onClick={() => setMobileOpen(true)} aria-expanded={mobileOpen} aria-controls="experience-filter-sheet">Filter</Button><ResultsHeader count={visible.length} sortOptions={sortOptions} sortValue={sort} onSortChange={setSort} className="mb-0 flex-1 justify-end" /></div><div className="grid gap-8 lg:grid-cols-[240px_1fr]"><FilterPanel config={config} values={values} onChange={onChange} onClear={clearFilters} title="Refine experiences" className="hidden lg:block" /><div><ResultsHeader count={visible.length} sortOptions={sortOptions} sortValue={sort} onSortChange={setSort} className="hidden lg:flex" />{loadError ? <ErrorState text={loadError} /> : loading ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((id) => <Skeleton key={id} className="h-80" />)}</div> : visible.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visible.map((item) => <ExperienceCard key={item.id} experience={item} />)}</div> : <EmptyState title="No experiences match those filters" text="Try broadening your search or clearing a filter." />}</div></div><FilterPanel mobile open={mobileOpen} onClose={() => setMobileOpen(false)} title="Filter experiences" config={config} values={values} onChange={onChange} onClear={clearFilters} onApply={() => setMobileOpen(false)} resultCount={`${visible.length} experiences`} /></Container></section>;
}
