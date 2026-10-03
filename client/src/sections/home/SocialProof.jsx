"use client";

import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import StatsBar from "@/components/shared/StatsBar";
import ReviewCard from "@/components/shared/ReviewCard";
import CardCarousel from "@/components/shared/CardCarousel";
import EmptyState from "@/components/ui/EmptyState";
import { platformMetrics, sampleReviews } from "./data";
import { FiMessageSquare } from "react-icons/fi";

export default function SocialProof({ reviews = sampleReviews }) {
  return (
    <div id="social-proof">
      {/* Platform Key Metrics Bar */}
      <StatsBar
        items={platformMetrics}
        className="border-y border-gray6 bg-white shadow-xs"
      />

      {/* Verified Traveler Reviews */}
      <Section bg="grey" spacing="md">
        <SectionHeading
          eyebrow="AUTHENTIC PERSPECTIVES"
          title="Stories from verified travelers"
          text="Honest reflections from travelers who explored our destinations, guided by local hosts."
        />

        {reviews.length > 0 ? (
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
        ) : (
          <EmptyState
            icon={<FiMessageSquare aria-hidden="true" />}
            title="Reviews loading"
            text="Authentic traveler testimonials are being synchronized from our review registry."
          />
        )}
      </Section>
    </div>
  );
}
