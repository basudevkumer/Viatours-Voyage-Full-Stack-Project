"use client";

import Image from "next/image";
import { useState } from "react";
import { FiArrowRight, FiClock, FiHeart, FiMapPin } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import IconButton from "@/components/ui/IconButton";
import PriceTag from "@/components/ui/PriceTag";
import RatingStars from "@/components/ui/RatingStars";

const TourCard = ({ tour }) => {
  const [saved, setSaved] = useState(false);
  const discount = tour.originalPrice ? Math.round((1 - Number(tour.price) / tour.originalPrice) * 100) : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[1.35] overflow-hidden">
        <Image src={tour.image} alt={`${tour.title} in ${tour.location}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {discount && <Badge variant="accent" className="absolute left-4 top-4">-{discount}%</Badge>}
        <IconButton icon={<FiHeart className={saved ? "fill-current" : ""} />} label={`${saved ? "Remove" : "Save"} ${tour.title} from wishlist`} onClick={() => setSaved((value) => !value)} aria-pressed={saved} className={`absolute right-4 top-4 bg-white/90 ${saved ? "text-accent" : "text-dark hover:text-accent"}`} />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3"><p className="body5 font-medium uppercase tracking-[1px] text-accent">{tour.category}</p><span className="body5 flex items-center gap-1 text-text-secondary"><FiClock /> {tour.days} days</span></div>
        <h3 className="title2 mt-2 line-clamp-2 min-h-[48px] text-dark">{tour.title}</h3>
        <p className="body4 mt-2 flex items-center gap-1.5 text-text-secondary"><FiMapPin className="text-accent" /> {tour.location}</p>
        <div className="mt-4 flex items-center gap-2 border-t border-gray6 pt-4">
          <RatingStars rating={tour.rating} reviewsCount={tour.reviews} showCount size="sm" />
          <span className="ml-auto body5 text-text-secondary">{tour.group}</span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <PriceTag price={tour.price} originalPrice={tour.originalPrice} className="gap-x-1" />
          <Button href={`/tours/${tour.id}`} variant="secondary" size="sm" rightIcon={<FiArrowRight />} data-analytics-id="tour-card-click">View tour</Button>
        </div>
      </div>
    </article>
  );
};

export default TourCard;
