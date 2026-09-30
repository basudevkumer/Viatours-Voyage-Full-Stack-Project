import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import { experiences } from "./data";

const LocalExperiences = () => <section className="bg-white py-14 sm:py-20"><Container><SectionHeading eyebrow="BEYOND THE POSTCARD" title="Experience the destination like a local" text="Choose the kind of moment that makes a place feel personal." /><div className="grid gap-5 md:grid-cols-3">{experiences.slice(4, 7).map((item) => <Link href={"/activities/" + item.id} key={item.id} className="group overflow-hidden rounded-2xl border border-gray6 bg-white"><div className="relative aspect-[1.4] overflow-hidden"><Image src={item.image} alt={item.title} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="p-5"><p className="body5 uppercase tracking-[1px] text-accent">{item.category}</p><h3 className="title2 mt-2 text-dark">{item.title}</h3><p className="body4 mt-2 text-text-secondary">A thoughtful way to connect with {item.destination}.</p></div></Link>)}</div></Container></section>;
export default LocalExperiences;
