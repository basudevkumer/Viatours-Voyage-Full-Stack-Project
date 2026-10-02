"use client";

import { FiArrowRight, FiClock, FiMapPin } from "react-icons/fi";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PriceTag from "@/components/ui/PriceTag";
import RatingStars from "@/components/ui/RatingStars";
import Card from "@/components/shared/Card";
import CardBody from "@/components/shared/CardBody";
import CardMedia from "@/components/shared/CardMedia";
import WishlistButton from "@/components/shared/WishlistButton";

export default function ExperienceCard({ experience }) {
  return <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <CardMedia src={experience.image} alt={`${experience.title} in ${experience.location}`} sizes="(max-width: 768px) 100vw, 33vw">
      <WishlistButton itemId={experience.id} itemType="experience" label={experience.title} className="absolute right-4 top-4 bg-white/90" />
    </CardMedia>
    <CardBody>
      <Badge variant="light" className="px-0 uppercase tracking-[1px] text-accent">{experience.category}</Badge>
      <h3 className="title2 mt-2 line-clamp-2 min-h-[48px] text-dark">{experience.title}</h3>
      <p className="body4 mt-2 flex items-center gap-1.5 text-text-secondary"><FiMapPin aria-hidden="true" className="text-accent" /> {experience.location}</p>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-gray6 pt-4"><span className="body5 flex items-center gap-1 text-text-secondary"><FiClock aria-hidden="true" /> {experience.duration}</span><span className="body5 text-text-secondary">{experience.group}</span></div>
      <div className="mt-3"><RatingStars rating={experience.rating} reviewsCount={experience.reviews} showCount size="sm" /></div>
      <div className="mt-4 flex items-end justify-between gap-3"><PriceTag price={experience.price} /><Button href={`/activities/${experience.id}`} variant="secondary" size="sm" rightIcon={<FiArrowRight />} data-analytics-id="experience-card-click">View experience</Button></div>
    </CardBody>
  </Card>;
}
