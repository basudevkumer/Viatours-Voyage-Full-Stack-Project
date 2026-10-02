import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ExperienceCard from "@/components/shared/ExperienceCard";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";
import { experiences } from "./data";

export default function PopularExperiences() {
  return <section className="py-14 sm:py-20"><Container><SectionHeading eyebrow="TRAVELERS ARE CHOOSING" title="Most popular experiences" text="See the activities travelers are adding to their next adventure." action={<Button href="#discover" variant="ghost" size="sm" rightIcon={<FiArrowRight />}>Explore all</Button>} /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{experiences.slice(0, 4).map((item) => <ExperienceCard key={item.id} experience={item} />)}</div></Container></section>;
}
