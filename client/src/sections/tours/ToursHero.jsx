import PageHero from "@/components/shared/PageHero";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";
import { trendingDestinations } from "./data";

export default function ToursHero() {
  return <PageHero eyebrow="EXPLORE THE WORLD" title="Find your perfect journey." text="Discover unforgettable destinations, curated experiences, and tours designed to turn your next trip into a story worth remembering." media={{ src: trendingDestinations[7].image, alt: "Hot air balloons over Cappadocia", caption: "Your next story starts here." }} actions={<><Button href="#discover" rightIcon={<FiArrowRight />} size="lg" data-analytics-id="tours-hero-search">Search tours</Button><Button href="/destinations" variant="outline" size="lg" className="!border-white/35 !text-white hover:!bg-white hover:!text-dark">Explore destinations</Button></>} />;
}
