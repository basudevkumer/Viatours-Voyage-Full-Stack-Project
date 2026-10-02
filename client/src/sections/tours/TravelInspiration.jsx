import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { trendingDestinations } from "./data";

const stories = [{ image: trendingDestinations[0].image, title: "How to choose a trip that fits your pace" }, { image: trendingDestinations[7].image, title: "A first-timer's guide to unforgettable experiences" }, { image: trendingDestinations[15].image, title: "The art of leaving room for wonder" }];

export default function TravelInspiration() {
  return <section className="bg-white py-14 sm:py-20"><Container><SectionHeading eyebrow="TRAVEL INSPIRATION" title="Get inspired for your next adventure" text="Helpful ideas for choosing where to go and what to do when you arrive." action={<Button href="/pages" variant="ghost" size="sm" rightIcon={<FiArrowRight />}>Explore travel guides</Button>} /><div className="grid gap-5 sm:grid-cols-3">{stories.map((story) => <Link href="/pages" key={story.title} className="group"><div className="relative aspect-[1.45] overflow-hidden rounded-2xl"><Image src={story.image} alt={story.title} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><h3 className="title2 mt-4 text-dark group-hover:text-accent">{story.title}</h3><p className="body4 mt-2 inline-flex items-center gap-1 text-accent">Read guide <FiArrowRight /></p></Link>)}</div></Container></section>;
}
