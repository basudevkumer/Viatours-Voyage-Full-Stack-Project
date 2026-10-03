import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import { travelStyles } from "./data";
import { FiArrowRight } from "react-icons/fi";

export default function TravelStyles() {
  return (
    <section className="py-14 sm:py-20 bg-gray7/30" id="travel-styles">
      <Container>
        <SectionHeading
          eyebrow="FIND YOUR TRAVEL STYLE"
          title="What kind of journey are you dreaming about?"
          text="Start with a feeling or pace, then discover curated tours designed around what moves you."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {travelStyles.map((style) => (
            <Link
              href={`/tours?category=${encodeURIComponent(style.category)}#discover`}
              key={style.title}
              className="group relative flex aspect-[1.35] flex-col justify-end overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              data-analytics-id={`tours-style-${style.category.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Image
                src={style.image}
                alt={style.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent"
                aria-hidden="true"
              />

              <div className="relative z-10 text-white">
                <span className="caption mb-1.5 inline-block text-accent font-semibold uppercase tracking-wider">
                  Explore Style
                </span>
                <h3 className="title2 mb-1.5 text-white">{style.title}</h3>
                <p className="body4 mb-3 text-white/80 line-clamp-2">{style.text}</p>
                <div className="inline-flex items-center gap-1.5 caption font-semibold text-accent group-hover:text-accent-hover">
                  <span>View {style.title} tours</span>
                  <FiArrowRight aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
