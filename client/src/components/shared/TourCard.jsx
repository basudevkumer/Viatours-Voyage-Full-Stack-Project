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

export default function TourCard({ tour, dealMode = false }) {
  const discount = tour.originalPrice ? Math.round((1 - Number(tour.price) / Number(tour.originalPrice)) * 100) : null;
  const savings = tour.originalPrice ? Math.round(Number(tour.originalPrice) - Number(tour.price)) : null;

  const badgeContent = dealMode && savings && discount ? (
    <Badge variant="accent" className="absolute left-4 top-4 font-semibold shadow-xs">
      Save ${savings} (-{discount}%)
    </Badge>
  ) : discount ? (
    <Badge variant="accent" className="absolute left-4 top-4">-{discount}%</Badge>
  ) : null;

  return (
    <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardMedia
        src={tour.image}
        alt={`${tour.title} in ${tour.location}`}
        sizes="(max-width: 768px) 100vw, 50vw"
        badge={badgeContent}
      >
        <WishlistButton itemId={tour.id} itemType="tour" label={tour.title} className="absolute right-4 top-4 bg-white/90" />
      </CardMedia>
      <CardBody className="flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="light" className="px-0 uppercase tracking-[1px] text-accent">
            {tour.category}
          </Badge>
          <span className="body5 flex items-center gap-1 text-text-secondary">
            <FiClock aria-hidden="true" /> {tour.days} days
          </span>
        </div>

        <h3 className="title2 mt-2 line-clamp-2 min-h-[48px] text-dark">{tour.title}</h3>
        <p className="body4 mt-2 flex items-center gap-1.5 text-text-secondary">
          <FiMapPin aria-hidden="true" className="text-accent shrink-0" /> {tour.location}
        </p>

        {dealMode && (
          <div className="mt-2.5 space-y-1 text-xs text-text-secondary">
            {tour.validUntil && (
              <p className="font-medium text-dark">
                Book by {formatDate(tour.validUntil)}
              </p>
            )}
            {tour.terms?.[0] && (
              <p className="line-clamp-1 text-gray3">
                {tour.terms[0]}
              </p>
            )}
          </div>
        )}

        <div className="mt-auto border-t border-gray6 pt-3">
          <div className="flex items-center gap-2">
            <RatingStars rating={tour.rating} reviewsCount={tour.reviews} showCount size="sm" />
            <span className="ml-auto body5 text-text-secondary">{tour.group}</span>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <PriceTag price={tour.price} originalPrice={tour.originalPrice} className="gap-x-1" />
            <Button
              href={`/tours/${tour.id}`}
              variant="secondary"
              size="sm"
              rightIcon={<FiArrowRight />}
              data-analytics-id={dealMode ? "deal-card-view" : "tour-card-click"}
            >
              {dealMode ? "View deal" : "View tour"}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
