import PageHero from "@/components/shared/PageHero";
import SearchBar from "@/components/shared/SearchBar";
import { FiArrowRight, FiUsers } from "react-icons/fi";
import { trendingDestinations } from "@/sections/tours/data";

export default function ExperiencesHero() {
  return <PageHero eyebrow="THINGS TO DO" title="Make your trip more than a destination." text="Discover local experiences, unforgettable activities, and memorable things to do wherever your journey takes you." media={{ src: trendingDestinations[4].image, alt: "Travelers enjoying a Bali experience", caption: "See a place through local eyes.", aspect: "aspect-[.9]" }}><SearchBar targetPath="/activities" submitLabel="Find experiences" className="mt-8" /><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60"><span><FiUsers className="mr-1 inline text-accent" />Small-group options</span><span><FiArrowRight className="mr-1 inline text-accent" />Local experiences</span></div></PageHero>;
}
