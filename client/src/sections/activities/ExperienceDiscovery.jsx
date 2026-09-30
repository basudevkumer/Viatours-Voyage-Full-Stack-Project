"use client";
import Container from "@/components/shared/Container";
import { useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";
import SectionHeading from "@/components/shared/SectionHeading";
import ExperienceCard from "@/components/shared/ExperienceCard";
import { experiences } from "./data";

const ExperienceDiscovery = () => {
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
  const controls = <><select value={destination} onChange={(event) => setDestination(event.target.value)} className="body4 rounded-xl border border-gray5 bg-white px-3 py-3 text-dark outline-none"><option value="all">All destinations</option>{destinations.map((item) => <option key={item} value={item}>{item}</option>)}</select><select value={category} onChange={(event) => setCategory(event.target.value)} className="body4 rounded-xl border border-gray5 bg-white px-3 py-3 text-dark outline-none"><option value="all">All interests</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></>;
  return <section id="discover" className="scroll-mt-24 py-14 sm:py-20"><Container><SectionHeading eyebrow="FIND SOMETHING MEMORABLE" title="Things to do where you're going" text="Compare experiences by destination, interest and rating before you decide." /><div className="mb-7 flex items-center justify-between gap-3 lg:hidden"><button type="button" onClick={() => setMobileFilter(true)} className="title4 inline-flex items-center gap-2 rounded-xl border border-gray5 bg-white px-4 py-3 text-dark"><FiFilter /> Filter</button><select value={sort} onChange={(event) => setSort(event.target.value)} className="body4 rounded-xl border border-gray5 bg-white px-3 py-3 text-dark outline-none"><option value="recommended">Recommended</option><option value="price">Price: low to high</option></select></div><div className="grid gap-8 lg:grid-cols-[240px_1fr]"><aside className="hidden space-y-5 rounded-2xl border border-gray6 bg-white p-5 lg:block"><p className="title2 text-dark">Refine experiences</p>{controls}<button type="button" onClick={() => { setDestination("all"); setCategory("all"); }} className="title4 text-accent hover:underline">Clear filters</button></aside><div><div className="mb-6 flex items-center justify-between"><p className="body3 text-text-secondary"><span className="font-semibold text-dark">{visible.length}</span> experiences</p><select value={sort} onChange={(event) => setSort(event.target.value)} className="body4 hidden rounded-xl border border-gray5 bg-white px-3 py-3 text-dark outline-none lg:block"><option value="recommended">Recommended</option><option value="price">Price: low to high</option></select></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visible.map((item) => <ExperienceCard key={item.id} experience={item} />)}</div></div></div></Container>{mobileFilter && <div className="fixed inset-0 z-[60] lg:hidden"><button type="button" aria-label="Close filter" onClick={() => setMobileFilter(false)} className="absolute inset-0 bg-dark/50" /><div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5"><h3 className="title1 text-dark">Filter experiences</h3><div className="mt-5 grid gap-3">{controls}</div><button type="button" onClick={() => setMobileFilter(false)} className="title4 mt-6 w-full rounded-xl bg-dark py-4 text-white">Show {visible.length} experiences</button></div></div>}</section>;
};
export default ExperienceDiscovery;
