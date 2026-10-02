import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";
import { tours } from "./data";

export default function SpecialDeals() {
  return <section className="py-14 sm:py-20"><Container><SectionHeading eyebrow="MAKE YOUR NEXT ESCAPE GO FURTHER" title="Special deals, thoughtfully chosen" text="Great experiences, with a little more room in your budget." action={<Button href="#discover" variant="ghost" size="sm" rightIcon={<FiArrowRight />}>See all deals</Button>} /><div className="grid gap-5 lg:grid-cols-3">{tours.filter((tour) => tour.originalPrice).slice(0, 3).map((tour) => <TourCard key={tour.id} tour={tour} />)}</div></Container></section>;
}
