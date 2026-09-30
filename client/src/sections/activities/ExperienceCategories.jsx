import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import { categories } from "./data";

const ExperienceCategories = () => <section className="py-14 sm:py-20"><Container><SectionHeading eyebrow="DISCOVER BY INTEREST" title="What do you feel like doing?" text="Start with the kind of moment you want to have, then find the place to make it happen." /><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">{categories.map((category) => <Link href="#discover" key={category.title} className="group relative aspect-[.85] overflow-hidden rounded-2xl"><Image src={category.image} alt={category.title} fill sizes="(max-width: 640px) 50vw, 17vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/20 to-transparent" /><div className="absolute bottom-4 left-4 right-3"><h3 className="title3 text-white">{category.title}</h3><p className="body5 mt-1 text-white/75">{category.count}</p></div></Link>)}</div></Container></section>;
export default ExperienceCategories;
