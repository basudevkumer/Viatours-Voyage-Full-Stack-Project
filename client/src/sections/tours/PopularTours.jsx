"use client";

import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import CardCarousel from "@/components/shared/CardCarousel";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";
import { tours } from "./data";

export default function PopularTours() {
  const popularList = tours.filter((t) => t.featured || t.popular).slice(0, 4);

  return (
    <section className="bg-white py-14 sm:py-20" id="popular-tours">
      <Container>
        <SectionHeading
          eyebrow="TRAVELERS' FAVOURITES"
          title="Top-rated journeys travelers love"
          text="Consistently chosen for exceptional native guides, seamless logistics, and rich regional storytelling."
          action={
            <Button
              href="#discover"
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight aria-hidden="true" />}
              data-analytics-id="popular-tours-view-all"
            >
              View all tours
            </Button>
          }
        />

        {/* Desktop Grid (Hidden on mobile) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularList.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* Mobile Carousel (Hidden on sm+) */}
        <div className="sm:hidden">
          <CardCarousel slidesPerView={1.15} spaceBetween={16} ariaLabel="Popular tours carousel">
            {popularList.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </CardCarousel>
        </div>
      </Container>
    </section>
  );
}
