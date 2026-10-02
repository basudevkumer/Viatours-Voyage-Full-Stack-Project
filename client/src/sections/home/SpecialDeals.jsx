import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import allImages from "@/components/helper/imageProvider";
import SectionHeading from "@/components/shared/SectionHeading";

const dealItems = [
  { image: "Bali", title: "A slower side of Bali", meta: "Temples, terraces and time to wander", href: "/tours" },
  { image: "Cappadocia", title: "See Cappadocia differently", meta: "A sky-high escape with room to explore", href: "/tours" },
];

const SpecialDeals = () => {
  const images = { Bali: allImages.trendingDestinations.find((item) => item.city === "Bali")?.image, Cappadocia: allImages.trendingDestinations.find((item) => item.city === "Cappadocia")?.image };

  return (
    <section className="bg-dark py-16 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="SEASONAL INSPIRATION" title="A reason to start planning" text="Thoughtful ideas for your next escape, ready when you are." tone="light" />
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
