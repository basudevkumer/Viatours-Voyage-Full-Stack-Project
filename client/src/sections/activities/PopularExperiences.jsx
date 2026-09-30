import Container from "@/components/shared/Container";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "@/components/shared/SectionHeading";
import ExperienceCard from "@/components/shared/ExperienceCard";
import { experiences } from "./data";

const PopularExperiences = () => <section className="py-14 sm:py-20"><Container><SectionHeading eyebrow="TRAVELERS ARE CHOOSING" title="Most popular experiences" text="See the activities travelers are adding to their next adventure." action={<Link href="#discover" className="title4 inline-flex items-center gap-2 text-accent">Explore all <FiArrowRight /></Link>} /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{experiences.slice(0, 4).map((item) => <ExperienceCard key={item.id} experience={item} />)}</div></Container></section>;
export default PopularExperiences;
