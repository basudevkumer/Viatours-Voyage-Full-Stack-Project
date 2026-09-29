import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import allImages from "@/components/helper/imageProvider";

const dealItems = [
  { image: "Bali", title: "A slower side of Bali", meta: "Temples, terraces and time to wander", href: "/tours" },
  { image: "Cappadocia", title: "See Cappadocia differently", meta: "A sky-high escape with room to explore", href: "/tours" },
];

const SpecialDeals = () => {
  const images = { Bali: allImages.trendingDestinations.find((item) => item.city === "Bali")?.image, Cappadocia: allImages.trendingDestinations.find((item) => item.city === "Cappadocia")?.image };

  return (
    <section className="bg-dark py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
          <div><p className="caption text-accent">SEASONAL INSPIRATION</p><h2 className="heading mt-3 text-white">A reason to start planning</h2></div>
          <p className="body4 hidden max-w-[280px] text-white/70 sm:block">Thoughtful ideas for your next escape, ready when you are.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {dealItems.map((item) => (
            <Link key={item.title} href={item.href} className="group relative min-h-[300px] overflow-hidden rounded-[24px] sm:min-h-[380px]">
              <Image src={images[item.image]} fill alt={item.title} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
              <div className="absolute bottom-0 p-5 sm:p-7"><p className="body4 text-white/75">{item.meta}</p><h3 className="title1 mt-2 text-white">{item.title}</h3><span className="title4 mt-4 inline-block text-white underline decoration-accent underline-offset-4">Explore the idea <span aria-hidden="true">→</span></span></div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SpecialDeals;
