import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function ExperiencesCTA() {
  return <section className="bg-dark py-16 text-center text-white sm:py-24"><Container><p className="caption text-white/60">TURN YOUR DESTINATION INTO AN EXPERIENCE</p><h2 className="heading mx-auto mt-4 max-w-[700px] !text-3xl sm:!text-5xl">Find something memorable to do.</h2><p className="body1 mx-auto mt-5 max-w-[600px] text-white/70">From local food and culture to adventure, nature and everything in between.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="#discover" size="lg" rightIcon={<FiArrowRight />} data-analytics-id="experiences-final-cta">Explore experiences</Button><Button href="/tours" variant="outline" size="lg" className="!border-white/35 !text-white hover:!bg-white hover:!text-dark">Browse tours</Button></div></Container></section>;
}
