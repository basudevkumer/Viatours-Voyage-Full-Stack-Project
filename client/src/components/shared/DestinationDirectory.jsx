"use client";

import { useMemo, useState } from "react";
import DestinationCard from "@/components/shared/DestinationCard";
import Input from "@/components/ui/Input";
import EmptyState from "@/components/ui/EmptyState";

export default function DestinationDirectory({ destinations = [] }) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => destinations.filter((destination) => destination.city.toLowerCase().includes(query.toLowerCase())), [destinations, query]);
  return <div><div className="mb-7 max-w-md"><Input label="Search destinations" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter a city" data-analytics-id="destination-search" /></div>{matches.length ? <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{matches.map((item) => <DestinationCard key={item.id} image={item.image} name={item.city} href={`/destinations/${item.city.toLowerCase().replaceAll(" ", "-")}`} className="h-[180px] sm:h-[220px]" />)}</div> : <EmptyState title="No destinations found" text="Try another city name." />}</div>;
}
