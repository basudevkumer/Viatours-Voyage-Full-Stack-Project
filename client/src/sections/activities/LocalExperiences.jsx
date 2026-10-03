import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import Badge from "@/components/ui/Badge";
import RatingStars from "@/components/ui/RatingStars";
import { experiences } from "./data";
import { FiClock, FiMapPin, FiArrowRight } from "react-icons/fi";

export default function LocalExperiences() {
  // Curated spotlight of 3 authentic local experiences
  const localList = experiences.slice(4, 7);

  return (
    <section className="bg-white py-14 sm:py-20" id="local-experiences">
      <Container>
        <SectionHeading
          eyebrow="BEYOND THE POSTCARD"
          title="Experience the destination like a local"
          text="Deepen your connection with local tradition through small-group workshops, artisan culinary walks, and heritage strolls."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {localList.map((item) => (
            <Link
              href={`/activities/${item.id}`}
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray6 bg-white transition-all duration-300 hover:border-gray5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              data-analytics-id={`local-exp-${item.id}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <Badge variant="accent" className="text-xs uppercase tracking-wider">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
                  <span className="flex items-center gap-1 font-medium text-dark">
                    <FiMapPin className="text-accent" aria-hidden="true" />
                    {item.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiClock aria-hidden="true" />
                    {item.duration}
                  </span>
                </div>

                <h3 className="title3 text-dark transition-colors group-hover:text-accent mb-2">
                  {item.title}
                </h3>

                <p className="body4 text-text-secondary line-clamp-2 mb-4 flex-1">
                  {item.description}
                </p>

                <div className="flex items-center justify-between border-t border-gray6 pt-3 mt-auto">
                  <div>
                    <span className="caption block text-text-secondary">From</span>
                    <span className="title4 font-bold text-dark">${item.price}</span>
                    <span className="caption text-text-secondary"> / person</span>
                  </div>

                  <span className="caption flex items-center gap-1 font-semibold text-accent group-hover:underline">
                    <span>View details</span>
                    <FiArrowRight aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
