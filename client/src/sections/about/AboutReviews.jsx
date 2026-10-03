"use client";

import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ReviewCard from "@/components/shared/ReviewCard";
import CardCarousel from "@/components/shared/CardCarousel";

/**
 * Data-driven Traveler Reviews section.
 * Renders ONLY when authentic, verified traveler reviews exist.
 * Safely omitted otherwise per anti-fabrication standards.
 */
export default function AboutReviews({ reviews = [] }) {
  if (!reviews || !reviews.length) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="reviews">
      <Container>
        <SectionHeading
          eyebrow="TRAVELER EXPERIENCES"
          title="Reflections from our community"
          text="Verified feedback from travelers who booked itineraries through Viatours Voyage."
        />

        <CardCarousel
          slidesPerView={1.1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          navigation
          pagination
          ariaLabel="Traveler reviews carousel"
          className="pb-10"
        >
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              avatar={review.avatar}
              rating={review.rating}
              date={review.date}
              text={review.text}
              tourTitle={review.tourTitle}
              source={review.source}
              className="h-full border border-gray6 shadow-xs"
            />
          ))}
        </CardCarousel>
      </Container>
    </section>
  );
}
