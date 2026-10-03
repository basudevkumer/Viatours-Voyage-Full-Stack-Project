"use client";

import TourCard from "./TourCard";
import ExperienceCard from "./ExperienceCard";

/**
 * Unified DealCard supporting both Tour and Experience items in deal mode.
 * Adapts normalized deal model to TourCard and ExperienceCard.
 */
export default function DealCard({ deal, className }) {
  if (!deal) return null;

  if (deal.itemType === "tour") {
    const tourData = {
      ...(deal.rawItem || {}),
      id: deal.itemId || deal.id,
      title: deal.title,
      location: deal.location,
      category: deal.category,
      days: deal.days || (deal.duration ? parseInt(deal.duration, 10) : 3),
      image: deal.image,
      rating: deal.rating,
      reviews: deal.reviews,
      group: deal.group,
      price: deal.price,
      originalPrice: deal.originalPrice,
      validUntil: deal.validUntil,
      dealLabel: deal.dealLabel,
      terms: deal.terms,
    };
    return <TourCard tour={tourData} dealMode className={className} />;
  }

  const expData = {
    ...(deal.rawItem || {}),
    id: deal.itemId || deal.id,
    title: deal.title,
    location: deal.location,
    category: deal.category,
    duration: deal.duration,
    image: deal.image,
    rating: deal.rating,
    reviews: deal.reviews,
    group: deal.group,
    price: deal.price,
    originalPrice: deal.originalPrice,
    validUntil: deal.validUntil,
    dealLabel: deal.dealLabel,
    terms: deal.terms,
  };
  return <ExperienceCard experience={expData} dealMode className={className} />;
}
