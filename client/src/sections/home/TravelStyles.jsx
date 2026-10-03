import Image from "next/image";
import Link from "next/link";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { travelStyles } from "./data";
import { FiArrowRight } from "react-icons/fi";

export default function TravelStyles() {
  return (
    <Section bg="cream" spacing="md" id="travel-styles">
      <SectionHeading
        eyebrow="TRAVEL STYLES & EXPERIENCES"
        title="Pick your kind of trip"
        text="Whether you crave high-altitude trails, slow coastal mornings, or immersive culinary heritage, find the rhythm that suits you."
        action={
          <Button
            href="/activities"
            variant="outline"
            size="sm"
            data-analytics-id="travel-styles-explore-all"
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            Explore all experiences
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {travelStyles.map((style) => (
          <Link
            key={style.id}
            href={style.href}
            data-analytics-id={`travel-style-${style.id}`}
            className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-gray6 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Background image container with subtle scale */}
            <div className="relative mb-5 h-[200px] w-full overflow-hidden rounded-xl sm:h-[220px]">
              <Image
                src={style.image}
                alt={style.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge variant="light" className="absolute left-3 top-3 shadow-md">
                {style.count}
              </Badge>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="title2 text-dark transition-colors group-hover:text-accent">
                  {style.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-field text-dark transition-all duration-300 group-hover:bg-accent group-hover:text-white"
                >
                  <FiArrowRight size={15} />
                </span>
              </div>
              <p className="body4 mt-2 text-text-secondary">{style.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
