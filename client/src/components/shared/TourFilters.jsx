"use client";

import { FiSearch, FiX } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

export default function TourFilters({ filters, setFilters, destinations = [], categories = [], onClose, mobile = false }) {
  const update = (key) => (event) => setFilters((state) => ({ ...state, [key]: event.target.value }));
  return <div className="space-y-6">
    {mobile && <div className="flex items-center justify-between border-b border-gray6 pb-5"><h3 className="title1 text-dark">Filter tours</h3><button type="button" onClick={onClose} aria-label="Close filters" className="flex h-11 w-11 items-center justify-center rounded-full text-dark"><FiX /></button></div>}
    <label className="block"><span className="title4 text-dark">Search tours</span><div className="mt-2 flex min-h-11 items-center gap-2 rounded-xl border border-gray5 px-3 py-2.5"><FiSearch aria-hidden="true" className="text-text-secondary" /><input value={filters.search} onChange={update("search")} placeholder="Search by destination" className="body4 min-w-0 w-full text-dark outline-none" /></div></label>
    <Select label="Destination" value={filters.destination} onChange={update("destination")}><option value="all">All destinations</option>{destinations.map((location) => <option key={location} value={location}>{location}</option>)}</Select>
    <Select label="Travel style" value={filters.category} onChange={update("category")}><option value="all">All styles</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</Select>
    <label className="block"><span className="flex justify-between"><span className="title4 text-dark">Maximum price</span><span className="body4 text-accent">${filters.maxPrice}</span></span><input type="range" min="99" max="900" step="25" value={filters.maxPrice} onChange={update("maxPrice")} className="mt-4 w-full accent-accent" /></label>
    <Button variant="ghost" size="sm" onClick={() => setFilters({ search: "", destination: "all", category: "all", maxPrice: 900 })}>Clear all filters</Button>
  </div>;
}
