import Image from "next/image";
import Container from "@/components/shared/Container";
import allImages from "@/components/helper/imageProvider";
import { FiCompass, FiHeart, FiMessageCircle } from "react-icons/fi";

const points = [
  { icon: FiCompass, title: "Curated with intent", text: "A considered mix of places, tours and local moments to help you choose well." },
  { icon: FiHeart, title: "Made for your pace", text: "Build a trip around the way you want to travel, from easy days to bold adventures." },
  { icon: FiMessageCircle, title: "Support when it matters", text: "Clear guidance before you go and thoughtful help while you are away." },
];

const WhyChooseUs = () => {
  const { tourImages } = allImages;

  return (
    <section className="bg-bg-cream py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative min-h-[360px] overflow-hidden rounded-[24px] sm:min-h-[460px]">
            <Image src={tourImages} fill alt="Travelers discovering a new destination" className="object-cover" />
            <div className="absolute bottom-5 left-5 max-w-[220px] rounded-2xl bg-white/95 p-4 shadow-lg">
              <p className="caption text-accent">TRAVEL, THOUGHTFULLY</p>
              <p className="title3 mt-2 text-dark">More than a booking. A better way to go.</p>
            </div>
          </div>
          <div>
            <p className="caption text-accent">WHY VIATOURS VOYAGE</p>
            <h2 className="heading mt-3 max-w-[560px] text-dark">Travel planning with more feeling and less friction.</h2>
            <p className="body1 mt-5 max-w-[580px] text-text-secondary">From first inspiration to the day you return, every detail should make your journey feel easier, richer and more like your own.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
              {points.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-sm"><Icon aria-hidden="true" size={21} /></div>
                  <div><h3 className="title3 text-dark">{title}</h3><p className="body4 mt-1 text-text-secondary">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
