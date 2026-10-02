import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function ToursFinalCTA() {
  return <section className="bg-dark py-16 text-center text-white sm:py-24"><Container><p className="caption text-white/60">YOUR NEXT ADVENTURE STARTS HERE</p><h2 className="heading mx-auto mt-4 max-w-[700px] !text-3xl sm:!text-5xl">Find a journey that feels like yours.</h2><p className="body1 mx-auto mt-5 max-w-[580px] text-white/70">Choose your travel style, discover somewhere new and start planning a story worth remembering.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="#discover" size="lg" rightIcon={<FiArrowRight />} data-analytics-id="tours-final-cta">Explore tours</Button><Button href="/contact" variant="outline" size="lg" className="!border-white/35 !text-white hover:!bg-white hover:!text-dark">Contact us</Button></div></Container></section>;
}
