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

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
}

export default function ExperienceCard({ experience, dealMode = false }) {
  const discount = experience.originalPrice
    ? Math.round((1 - Number(experience.price) / Number(experience.originalPrice)) * 100)
    : null;
  const savings = experience.originalPrice
    ? Math.round(Number(experience.originalPrice) - Number(experience.price))
    : null;

  return (
    <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardMedia
        src={experience.image}
        alt={`${experience.title} in ${experience.location}`}
        sizes="(max-width: 768px) 100vw, 33vw"
        badge={
          dealMode && savings && discount ? (
            <Badge variant="accent" className="absolute left-3 top-3 font-semibold shadow-xs">
              Save ${savings} (-{discount}%)
            </Badge>
          ) : discount ? (
            <Badge variant="accent" className="absolute left-3 top-3">
              -{discount}%
            </Badge>
          ) : null
        }
      >
        {!dealMode && experience.features?.includes("freeCancellation") && (
          <span className="caption absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-success shadow-xs">
            Free cancellation
          </span>
        )}
        <WishlistButton
          itemId={experience.id}
          itemType="experience"
          label={experience.title}
          className="absolute right-4 top-4 bg-white/90"
        />
      </CardMedia>
      <CardBody className="flex flex-1 flex-col">
        <Badge variant="light" className="px-0 uppercase tracking-[1px] text-accent">
          {experience.category}
        </Badge>
        <h3 className="title2 mt-2 line-clamp-2 min-h-[48px] text-dark">{experience.title}</h3>
        <p className="body4 mt-2 flex items-center gap-1.5 text-text-secondary">
          <FiMapPin aria-hidden="true" className="text-accent shrink-0" /> {experience.location}
        </p>

        {dealMode && (
          <div className="mt-2.5 space-y-1 text-xs text-text-secondary">
            {experience.validUntil && (
              <p className="font-medium text-dark">
                Book by {formatDate(experience.validUntil)}
              </p>
            )}
            {experience.terms?.[0] && (
              <p className="line-clamp-1 text-gray3">
                {experience.terms[0]}
              </p>
            )}
          </div>
        )}

        <div className="mt-auto border-t border-gray6 pt-3">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span className="body5 flex items-center gap-1 text-text-secondary">
              <FiClock aria-hidden="true" /> {experience.duration}
            </span>
            <span className="body5 text-text-secondary">{experience.group}</span>
          </div>
          <div className="mt-2">
            <RatingStars rating={experience.rating} reviewsCount={experience.reviews} showCount size="sm" />
          </div>
          <div className="mt-3 flex items-end justify-between gap-3">
            <PriceTag
              price={experience.price}
              originalPrice={experience.originalPrice}
              className="gap-x-1"
            />
            <Button
              href={`/activities/${experience.id}`}
              variant="secondary"
              size="sm"
              rightIcon={<FiArrowRight />}
              data-analytics-id={dealMode ? "deal-card-view" : "experience-card-click"}
            >
              {dealMode ? "View deal" : "View experience"}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
