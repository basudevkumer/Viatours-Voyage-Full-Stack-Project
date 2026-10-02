"use client";

import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ExperienceCard from "@/components/shared/ExperienceCard";
import BottomSheet from "@/components/ui/BottomSheet";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { experiences } from "./data";

export default function ExperienceDiscovery() {
  const [destination, setDestination] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [mobileFilter, setMobileFilter] = useState(false);
  const destinations = [...new Set(experiences.map((item) => item.destination))];
  const categories = [...new Set(experiences.map((item) => item.category))];
  const visible = useMemo(() => {
    const items = experiences.filter((item) => (destination === "all" || item.destination === destination) && (category === "all" || item.category === category));
    return [...items].sort((a, b) => sort === "price" ? a.price - b.price : b.rating - a.rating);
  }, [destination, category, sort]);
  const controls = <><Select label="Destination" value={destination} onChange={(event) => setDestination(event.target.value)}><option value="all">All destinations</option>{destinations.map((item) => <option key={item} value={item}>{item}</option>)}</Select><Select label="Interest" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All interests</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</Select></>;
  const sortOptions = <><option value="recommended">Recommended</option><option value="price">Price: low to high</option></>;
  const clear = () => { setDestination("all"); setCategory("all"); };

  return <section id="discover" className="scroll-mt-24 py-14 sm:py-20"><Container><SectionHeading eyebrow="FIND SOMETHING MEMORABLE" title="Things to do where you're going" text="Compare experiences by destination, interest and rating before you decide." />
    <div className="mb-7 flex items-center justify-between gap-3 lg:hidden"><Button variant="outline" leftIcon={<FiFilter />} onClick={() => setMobileFilter(true)} aria-expanded={mobileFilter} aria-controls="experience-filter-sheet">Filter</Button><Select label="Sort experiences" labelClassName="sr-only" wrapperClassName="w-auto" className="px-3 py-2" value={sort} onChange={(event) => setSort(event.target.value)}>{sortOptions}</Select></div>
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]"><aside className="hidden space-y-5 rounded-2xl border border-gray6 bg-white p-5 lg:block"><p className="title2 text-dark">Refine experiences</p>{controls}<Button variant="ghost" size="sm" onClick={clear}>Clear filters</Button></aside><div><div className="mb-6 flex items-center justify-between"><p className="body3 text-text-secondary"><span className="font-semibold text-dark">{visible.length}</span> experiences</p><Select label="Sort experiences" labelClassName="sr-only" wrapperClassName="hidden w-auto lg:block" className="px-3 py-2" value={sort} onChange={(event) => setSort(event.target.value)}>{sortOptions}</Select></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visible.map((item) => <ExperienceCard key={item.id} experience={item} />)}</div></div></div>
  </Container><BottomSheet open={mobileFilter} onClose={() => setMobileFilter(false)} title="Filter experiences" overlayClassName="items-end p-0 lg:hidden"><div id="experience-filter-sheet" className="grid gap-3">{controls}<Button variant="secondary" fullWidth className="mt-3" onClick={() => setMobileFilter(false)}>Show {visible.length} experiences</Button></div></BottomSheet></section>;
}
