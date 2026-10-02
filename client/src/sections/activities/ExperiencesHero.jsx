import Container from "@/components/shared/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { FiArrowRight, FiCalendar, FiMapPin, FiSearch, FiUsers } from "react-icons/fi";
import { trendingDestinations } from "@/sections/tours/data";

const ExperiencesHero = () => (
  <section className="relative overflow-hidden bg-dark pt-32 text-white sm:pt-36 lg:pt-40">
    <div className="hero-gradient absolute inset-0" />
    <Container>
      <div className="relative grid items-center gap-10 pb-14 lg:grid-cols-[1fr_430px] lg:pb-20">
        <div>
          <p className="caption text-white/60">THINGS TO DO</p>
          <h1 className="heading mt-4 max-w-[650px] !text-4xl sm:!text-5xl lg:!text-6xl">Make your trip more than a destination.</h1>
          <p className="body1 mt-5 max-w-[610px] text-white/75">Discover local experiences, unforgettable activities, and memorable things to do wherever your journey takes you.</p>
          <form action="#discover" className="mt-8 grid max-w-[760px] gap-1 rounded-2xl bg-white p-2.5 sm:grid-cols-[1.5fr_1fr_1fr_auto] sm:rounded-full">
            <label className="flex items-center gap-2 rounded-xl px-3 py-2 sm:rounded-full"><FiSearch className="shrink-0 text-accent" /><span className="sr-only">What do you want to do?</span><input name="experience" placeholder="What do you want to do?" className="body4 w-full min-w-0 text-dark outline-none" /></label>
            <label className="flex items-center gap-2 border-t border-gray6 px-3 py-2 sm:border-l sm:border-t-0"><FiMapPin className="text-accent" /><span className="sr-only">Destination</span><input name="destination" placeholder="Where?" className="body4 w-full min-w-0 text-dark outline-none" /></label>
            <label className="flex items-center gap-2 border-t border-gray6 px-3 py-2 sm:border-l sm:border-t-0"><FiCalendar className="text-accent" /><span className="sr-only">Date</span><input name="date" placeholder="When?" className="body4 w-full min-w-0 text-dark outline-none" /></label>
            <Button type="submit" size="md" className="sm:rounded-full" data-analytics-id="experiences-hero-search">Find experiences</Button>
          </form>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60"><span><FiUsers className="mr-1 inline text-accent" />Small-group options</span><span><FiArrowRight className="mr-1 inline text-accent" />Local experiences</span></div>
        </div>
        <div className="relative hidden aspect-[.9] overflow-hidden rounded-[32px] border border-white/20 lg:block">
          <Image src={trendingDestinations[4].image} alt="Travelers enjoying a Bali experience" fill priority sizes="430px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/75 to-transparent" />
          <p className="title2 absolute bottom-6 left-6 max-w-[260px]">See a place through local eyes.</p>
        </div>
      </div>
    </Container>
  </section>
);

export default ExperiencesHero;
