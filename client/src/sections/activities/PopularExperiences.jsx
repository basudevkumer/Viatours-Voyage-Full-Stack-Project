"use client";

import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ExperienceCard from "@/components/shared/ExperienceCard";
import CardCarousel from "@/components/shared/CardCarousel";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";
import { experiences } from "./data";

export default function PopularExperiences() {
  const popularList = experiences.filter((e) => e.featured || e.popular).slice(0, 4);

  return (
    <section className="bg-white py-14 sm:py-20" id="popular-experiences">
      <Container>
        <SectionHeading
          eyebrow="GUEST FAVORITES"
          title="Most popular activities travelers love"
          text="Consistently rated 4.8+ by travelers for knowledgeable local hosts, intimate group sizes, and authentic pacing."
          action={
            <Button
              href="#discover"
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight aria-hidden="true" />}
              data-analytics-id="popular-exp-view-all"
            >
              View all activities
            </Button>
          }
        />

        {/* Desktop Grid (Hidden on mobile) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularList.map((item) => (
            <ExperienceCard key={item.id} experience={item} />
          ))}
        </div>

        {/* Mobile Carousel (Hidden on sm+) */}
        <div className="sm:hidden">
          <CardCarousel slidesPerView={1.15} spaceBetween={16} ariaLabel="Popular experiences carousel">
            {popularList.map((item) => (
              <ExperienceCard key={item.id} experience={item} />
            ))}
          </CardCarousel>
        </div>
      </Container>
    </section>
  );
}
