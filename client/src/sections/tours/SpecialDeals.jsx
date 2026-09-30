import Container from "@/components/shared/Container";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import { tours } from "./data";

const SpecialDeals = () => <section className="py-14 sm:py-20"><Container><SectionHeading eyebrow="MAKE YOUR NEXT ESCAPE GO FURTHER" title="Special deals, thoughtfully chosen" text="Great experiences, with a little more room in your budget." action={<Link href="#discover" className="title4 inline-flex items-center gap-2 text-accent">See all deals <FiArrowRight /></Link>} /><div className="grid gap-5 lg:grid-cols-3">{tours.filter((tour) => tour.originalPrice).slice(0, 3).map((tour) => <TourCard key={tour.id} tour={tour} />)}</div></Container></section>;
export default SpecialDeals;
