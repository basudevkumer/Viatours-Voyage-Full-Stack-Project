import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { trendingDestinations } from "./data";

const ToursHero = () => (
  <section className="relative overflow-hidden bg-dark pt-32 text-white sm:pt-36 lg:pt-40">
    <div className="hero-gradient absolute inset-0" />
    <Container>
      <div className="relative grid items-center gap-10 pb-16 lg:grid-cols-[1fr_420px] lg:pb-24">
        <div className="max-w-[680px]">
          <p className="caption text-white/60">EXPLORE THE WORLD</p>
          <h1 className="heading mt-4 max-w-[620px] !text-4xl sm:!text-5xl lg:!text-6xl">Find your perfect journey.</h1>
          <p className="body1 mt-5 max-w-[600px] text-white/75">Discover unforgettable destinations, curated experiences, and tours designed to turn your next trip into a story worth remembering.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#discover" className="title4 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-4 text-white hover:bg-white hover:text-accent">Search tours <FiArrowRight /></a>
            <Link href="/destinations" className="title4 inline-flex items-center rounded-xl border border-white/35 px-5 py-4 text-white hover:bg-white hover:text-dark">Explore destinations</Link>
          </div>
        </div>
        <div className="relative hidden aspect-square overflow-hidden rounded-[32px] border border-white/20 lg:block">
          <Image src={trendingDestinations[7].image} alt="Hot air balloons over Cappadocia" fill priority sizes="420px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
          <p className="title3 absolute bottom-6 left-6">Your next story starts here.</p>
        </div>
      </div>
    </Container>
  </section>
);

export default ToursHero;
