import PageHero from "@/components/shared/PageHero";
import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/site";
import allImages from "@/components/helper/imageProvider";
import { FiCheckCircle, FiShield, FiCompass, FiUsers } from "react-icons/fi";

const { trendingDestinations } = allImages;

export default function AboutHero() {
  const highlights = [
    {
      icon: <FiCompass className="text-accent" aria-hidden="true" />,
      text: "Handcrafted global routes",
    },
    {
      icon: <FiUsers className="text-accent" aria-hidden="true" />,
      text: "Small-group & private pacing",
    },
    {
      icon: <FiShield className="text-success" aria-hidden="true" />,
      text: "Transparent upfront pricing",
    },
    {
      icon: <FiCheckCircle className="text-accent" aria-hidden="true" />,
      text: "24/7 coordinator assistance",
    },
  ];

  return (
    <PageHero
      eyebrow={SITE_CONFIG.tagline.toUpperCase()}
      title={`About ${SITE_CONFIG.name}`}
      text={SITE_CONFIG.mission}
      actions={
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Button
            href="#plan"
            size="lg"
            data-analytics-id="about-hero-plan"
            className="hover:!bg-white hover:!text-accent"
          >
            Plan my trip
          </Button>
          <Button
            href="/tours"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white hover:text-dark"
            data-analytics-id="about-hero-tours"
          >
            Explore tours
          </Button>
        </div>
      }
      media={{
        src: trendingDestinations[0].image,
        alt: `${SITE_CONFIG.name} curated travel planning and destination expertise`,
        aspect: "aspect-[4/3]",
      }}
    >
      <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/15 pt-6 sm:flex sm:flex-wrap sm:gap-6">
        {highlights.map((item) => (
          <div key={item.text} className="flex items-center gap-2">
            <span className="shrink-0 text-base sm:text-lg">{item.icon}</span>
            <span className="caption font-medium text-white/85 sm:body5 sm:text-white/90">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </PageHero>
  );
}
