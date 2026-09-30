import Container from "@/components/shared/Container";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "@/components/shared/SectionHeading";
import TourCard from "@/components/shared/TourCard";
import { tours } from "./data";

const PopularTours = () => <section className="bg-white py-14 sm:py-20"><Container><SectionHeading eyebrow="TRAVELERS' FAVOURITES" title="Popular journeys travelers love" text="Explore the experiences people are choosing again and again." action={<Link href="#discover" className="title4 inline-flex items-center gap-2 text-accent">View all tours <FiArrowRight /></Link>} /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{tours.slice(0, 4).map((tour) => <TourCard key={tour.id} tour={tour} />)}</div></Container></section>;
export default PopularTours;
