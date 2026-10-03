import Image from "next/image";
import Link from "next/link";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import { travelStylePicks } from "./data";
import { FiArrowRight } from "react-icons/fi";

export default function TravelStylePicks() {
  return (
    <Section bg="white" spacing="md" id="travel-styles">
      <SectionHeading
        eyebrow="TAILORED EXPERIENCES"
        title="Find a destination by travel style"
        text="Whether you crave secluded island shores, remote mountain trails, or vibrant metropolis culture."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {travelStylePicks.map((style) => (
          <div
            key={style.id}
            className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-xl"
          >
            {/* Background image */}
            <Image
              src={style.image}
              alt={style.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/50 to-transparent"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 text-white">
              <h3 className="title2 mb-1.5 text-white">{style.title}</h3>
              <p className="body4 mb-3 text-white/80 line-clamp-2">{style.subtitle}</p>

              {/* Sample featured destinations */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {style.destinations.map((city) => (
                  <span
                    key={city}
                    className="caption rounded-full bg-white/20 px-2.5 py-0.5 text-white backdrop-blur-xs"
                  >
                    {city}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={style.toursHref}
                  className="body4 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-accent hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  data-analytics-id={`style-tours-${style.id}`}
                >
                  View {style.title} tours <FiArrowRight aria-hidden="true" />
                </Link>
                <Link
                  href={`/destinations?travelStyle=${encodeURIComponent(style.title.split(" ")[0])}#explorer`}
                  className="caption inline-flex min-h-[44px] items-center text-white/70 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  data-analytics-id={`style-dest-${style.id}`}
                >
                  Filter destinations
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
