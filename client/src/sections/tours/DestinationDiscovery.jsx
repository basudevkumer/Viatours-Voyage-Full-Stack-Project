import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import { trendingDestinations } from "./data";

const DestinationDiscovery = () => <section className="bg-white py-14 sm:py-20"><Container><SectionHeading eyebrow="GO SOMEWHERE NEW" title="Where will you go next?" text="Browse destinations made for your next chapter." /><div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{trendingDestinations.slice(0, 8).map((destination) => <Link href="#discover" key={destination.id} className="group relative aspect-[.9] overflow-hidden rounded-2xl"><Image src={destination.image} alt={destination.city} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" /><div className="absolute bottom-4 left-4"><h3 className="title3 text-white">{destination.city}</h3><p className="body5 mt-1 text-white/75">{destination.tours}</p></div></Link>)}</div></Container></section>;
export default DestinationDiscovery;
