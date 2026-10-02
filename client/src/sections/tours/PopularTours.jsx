import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";
import { tours } from "./data";

export default function PopularTours() {
  return <section className="bg-white py-14 sm:py-20"><Container><SectionHeading eyebrow="TRAVELERS' FAVOURITES" title="Popular journeys travelers love" text="Explore the experiences people are choosing again and again." action={<Button href="#discover" variant="ghost" size="sm" rightIcon={<FiArrowRight />}>View all tours</Button>} /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{tours.slice(0, 4).map((tour) => <TourCard key={tour.id} tour={tour} />)}</div></Container></section>;
}
