import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { experiences } from "./data";

export default function DestinationCrossSell() {
  const item = experiences[1];
  return <section className="bg-commonbg py-14 sm:py-20"><Container><div className="grid items-center gap-8 lg:grid-cols-2"><div className="relative aspect-[1.2] overflow-hidden rounded-2xl"><Image src={item.image} alt={item.title} fill sizes="50vw" className="object-cover" /></div><div><p className="caption text-accent">COMPLETE YOUR ITINERARY</p><h2 className="heading mt-3 text-dark">Staying in {item.destination}?</h2><p className="body1 mt-4 text-text-secondary">Add a local experience to your trip and see your destination through a different lens.</p><div className="mt-7 flex flex-wrap gap-3"><Button href={`/activities/${item.id}`} rightIcon={<FiArrowRight />} size="lg">Explore experience</Button><Button href="/tours" variant="outline" size="lg">Explore tours</Button></div></div></div></Container></section>;
}
