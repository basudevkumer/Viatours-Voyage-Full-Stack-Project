import Link from "next/link";
import Container from "@/components/shared/Container";
import PopularCard from "@/components/shared/PopularCard";
import allImages from "@/components/helper/imageProvider";

const Experiences = () => {
  const { popularThings } = allImages;
  const experiences = popularThings.slice(0, 8);

  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
          <div><p className="caption text-accent">FIND YOUR WHY</p><h2 className="heading mt-3 text-dark">Choose an experience</h2></div>
          <Link href="/activities" className="title4 hidden text-dark transition-colors hover:text-accent sm:block">Explore all experiences <span aria-hidden="true">→</span></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5 lg:gap-6">
          {experiences.map((item) => <PopularCard key={item.id} img={item.image} title={item.title} num={item.count} />)}
        </div>
        <Link href="/activities" className="title4 mt-6 inline-block text-dark transition-colors hover:text-accent sm:hidden">Explore all experiences <span aria-hidden="true">→</span></Link>
      </Container>
    </section>
  );
};

export default Experiences;
