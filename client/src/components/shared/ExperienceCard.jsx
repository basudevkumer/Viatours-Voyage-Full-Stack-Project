"use client";

import Image from "next/image";
import { useState } from "react";
import { FiArrowRight, FiClock, FiHeart, FiMapPin } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import IconButton from "@/components/ui/IconButton";
import PriceTag from "@/components/ui/PriceTag";
import RatingStars from "@/components/ui/RatingStars";

const ExperienceCard = ({ experience }) => {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[1.35] overflow-hidden">
        <Image src={experience.image} alt={`${experience.title} in ${experience.location}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <IconButton icon={<FiHeart className={saved ? "fill-current" : ""} />} label={`${saved ? "Remove" : "Save"} ${experience.title}`} onClick={() => setSaved((value) => !value)} aria-pressed={saved} className={`absolute right-4 top-4 bg-white/90 ${saved ? "text-accent" : "text-dark hover:text-accent"}`} />
      </div>
      <div className="p-5">
        <Badge variant="light" className="px-0 uppercase tracking-[1px] text-accent">{experience.category}</Badge>
        <h3 className="title2 mt-2 line-clamp-2 min-h-[48px] text-dark">{experience.title}</h3>
        <p className="body4 mt-2 flex items-center gap-1.5 text-text-secondary"><FiMapPin className="text-accent" /> {experience.location}</p>
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-gray6 pt-4">
          <span className="body5 flex items-center gap-1 text-text-secondary"><FiClock /> {experience.duration}</span>
          <span className="body5 text-text-secondary">{experience.group}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <RatingStars rating={experience.rating} reviewsCount={experience.reviews} showCount size="sm" />
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <PriceTag price={experience.price} />
          <Button href={`/activities/${experience.id}`} variant="secondary" size="sm" rightIcon={<FiArrowRight />} data-analytics-id="experience-card-click">View experience</Button>
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;
