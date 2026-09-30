import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import { travelStyles } from "./data";

const TravelStyles = () => <section className="py-14 sm:py-20"><Container><SectionHeading eyebrow="FIND YOUR TRAVEL STYLE" title="What kind of trip are you dreaming about?" text="Start with a feeling, then find the experience that fits." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{travelStyles.map((style) => <Link href="#discover" key={style.title} className="group relative aspect-[1.35] overflow-hidden rounded-2xl"><Image src={style.image} alt={style.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/20 to-transparent" /><div className="absolute bottom-5 left-5 right-5"><h3 className="title1 text-white">{style.title}</h3><p className="body4 mt-1 max-w-[300px] text-white/75">{style.text}</p></div></Link>)}</div></Container></section>;
export default TravelStyles;
