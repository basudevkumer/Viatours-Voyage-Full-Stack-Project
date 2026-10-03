import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import { collections } from "./data";
import { FiArrowRight } from "react-icons/fi";

export default function ExperienceCollections() {
  const getFilterUrl = (filter) => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, val]) => {
      params.set(key, val);
    });
    return `/activities?${params.toString()}#discover`;
  };

  return (
    <section className="bg-white py-14 sm:py-20" id="collections">
      <Container>
        <SectionHeading
          eyebrow="TRAVEL WITH INTENTION"
          title="Curated collections for every kind of day"
          text="Looking for a specific vibe? Start with an intention and explore activities that match your travel rhythm."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              href={getFilterUrl(collection.filter)}
              key={collection.id || collection.title}
              className="group relative flex aspect-[.95] flex-col justify-end overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              data-analytics-id={`exp-collection-${collection.id || collection.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent"
                aria-hidden="true"
              />

              <div className="relative z-10 text-white">
                <span className="caption mb-1 inline-block text-accent font-semibold uppercase tracking-wider">
                  Featured Collection
                </span>
                <h3 className="title2 text-white mb-1.5">{collection.title}</h3>
                <p className="body4 text-white/80 line-clamp-2 mb-3">{collection.text}</p>
                <div className="inline-flex items-center gap-1.5 caption font-semibold text-accent group-hover:text-accent-hover">
                  <span>Browse collection</span>
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
