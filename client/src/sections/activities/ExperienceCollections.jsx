import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import { collections } from "./data";

const ExperienceCollections = () => <section className="bg-white py-14 sm:py-20"><Container><SectionHeading eyebrow="TRAVEL WITH AN INTENTION" title="Collections for the way you travel" text="Not sure what to choose? Start with a collection that matches your itinerary." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{collections.map((collection) => <Link href="#discover" key={collection.title} className="group relative aspect-[.95] overflow-hidden rounded-2xl"><Image src={collection.image} alt={collection.title} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent" /><div className="absolute bottom-5 left-5 right-5"><h3 className="title2 text-white">{collection.title}</h3><p className="body4 mt-1 text-white/75">{collection.text}</p></div></Link>)}</div></Container></section>;
export default ExperienceCollections;
