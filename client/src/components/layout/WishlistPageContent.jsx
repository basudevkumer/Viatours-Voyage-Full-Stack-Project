"use client";

import Link from "next/link";
import { useContext } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function WishlistPageContent() {
  const { items = [] } = useContext(WishlistContext) || {};
  if (!items.length) return <EmptyState title="Your wishlist is empty" text="Save tours and experiences you want to revisit." action={<Button href="/tours">Explore tours</Button>} />;
  return <section><h1 className="heading mb-6 text-dark">Your wishlist</h1><ul className="grid gap-3">{items.map((item) => <li key={`${item.type}-${item.id}`} className="rounded-xl border border-gray6 bg-white p-4"><Link className="title3 text-dark hover:text-accent" href={`/${item.type === "experience" ? "activities" : "tours"}/${item.id}`}>{item.label || `${item.type} ${item.id}`}</Link></li>)}</ul></section>;
}
