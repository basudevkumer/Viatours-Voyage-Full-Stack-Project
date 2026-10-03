import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import { getExperienceCategories } from "@/services/experienceService";

export default async function ExperienceCategories() {
  const result = await getExperienceCategories();
  const categories = result.success ? result.data : [];

  return (
    <section className="py-14 sm:py-20" id="categories">
      <Container>
        <SectionHeading
          eyebrow="DISCOVER BY INTEREST"
          title="What kind of moment do you want to have?"
          text="Start with an interest, then find handcrafted activities hosted by native specialists."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {categories.map((category) => (
            <Link
              href={`/activities?category=${encodeURIComponent(category.title)}#discover`}
              key={category.title}
              className="group relative flex aspect-[.85] flex-col justify-end overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              data-analytics-id={`exp-category-${category.title.toLowerCase()}`}
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent"
                aria-hidden="true"
              />

              <div className="relative z-10 text-white">
                <h3 className="title3 text-white mb-0.5">{category.title}</h3>
                <p className="caption text-white/80">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
