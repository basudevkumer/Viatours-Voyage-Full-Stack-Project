import Container from "@/components/shared/Container";
import allImages from "@/components/helper/imageProvider";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import React from "react";

const Bannar = () => {
  const { banner, map } = allImages;

  return (
    <section
      style={{ backgroundImage: `url(${banner.src ?? banner})` }}
      data-home-hero
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      data-hero-background
    >
      <div className="min-h-[680px] bg-dark/45 lg:min-h-[760px] lg:bg-dark/20">
        <Container>
          <div className="relative z-10 flex min-h-[680px] flex-col justify-end pb-10 pt-32 sm:pb-16 lg:min-h-[760px] lg:justify-center lg:pb-0">
            <div data-hero-copy className="max-w-[650px]">
              <p className="caption text-white/80">GO SOMEWHERE THAT STAYS WITH YOU</p>
              <h1 className="heading mt-4 max-w-[620px] !text-4xl text-white sm:!text-5xl lg:!text-6xl">Find your next unforgettable journey.</h1>
              <p className="body1 mt-5 max-w-[560px] text-white/85">Discover considered trips, local experiences and the confidence to plan your way.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/tours" className="title4 inline-flex items-center gap-2 rounded-[12px] bg-accent px-5 py-4 text-white transition-colors hover:bg-white hover:text-accent">Explore tours <FiArrowRight aria-hidden="true" /></Link>
                <Link href="/contact" className="title4 inline-flex items-center rounded-[12px] border border-white/60 px-5 py-4 text-white transition-colors hover:border-white hover:bg-white hover:text-dark">Plan your trip</Link>
              </div>
            </div>

            <form action="/tours" method="get" className="mt-10 grid max-w-[820px] gap-2 rounded-2xl bg-white p-3 shadow-xl sm:grid-cols-[1.3fr_1fr_1fr_auto] sm:rounded-full sm:p-2">
              <label className="flex items-center gap-3 rounded-xl px-3 py-2 sm:rounded-full" htmlFor="hero-destination"><FiMapPin aria-hidden="true" className="text-accent" /><span className="sr-only">Destination</span><input id="hero-destination" name="destination" placeholder="Where do you want to go?" className="body4 min-w-0 w-full text-dark placeholder:text-text-secondary focus:outline-none" /></label>
              <label className="flex items-center gap-3 border-t border-gray6 px-3 py-2 sm:border-l sm:border-t-0"><FiCalendar aria-hidden="true" className="text-accent" /><span className="sr-only">Travel dates</span><input name="date" type="text" placeholder="When" className="body4 min-w-0 w-full text-dark placeholder:text-text-secondary focus:outline-none" /></label>
              <label className="flex items-center gap-3 border-t border-gray6 px-3 py-2 sm:border-l sm:border-t-0"><FiUsers aria-hidden="true" className="text-accent" /><span className="sr-only">Travelers</span><input name="travelers" type="text" placeholder="Travelers" className="body4 min-w-0 w-full text-dark placeholder:text-text-secondary focus:outline-none" /></label>
              <button type="submit" className="title4 rounded-xl bg-dark px-5 py-3 text-white transition-colors hover:bg-accent sm:rounded-full">Search</button>
            </form>

            {/* ─── Right: Map Card ─── */}
            <div className="hidden lg:block absolute right-8 top-1/2 mt-8 -translate-y-1/2 sm:right-12 lg:right-[8%]">
              <div className="max-w-[280px] sm:max-w-[340px] lg:w-[700px] bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/20">

                <div className="mb-3">
                  <p className="body5 text-white/70">Day 1</p>
                  <p className="title4 text-white mt-1">Secret Lagoon</p>
                </div>

                <div className="rounded-xl overflow-hidden">
                  <Image
                    src={map}
                    alt="Tour route map"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="mt-3 flex justify-end">
                  <div className="text-right">
                    <p className="body5 text-white/70">Day 5</p>
                    <p className="title4 text-white mt-1">Secret Lagoon</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
};

export default Bannar;
