import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getFeaturedGuides } from "@/services/guideService";
import { FiClock, FiArrowRight, FiBookOpen } from "react-icons/fi";

export default async function FeaturedGuides() {
  const result = await getFeaturedGuides();
  if (!result.success || !result.data?.featured) return null;

  const { featured, editorsPicks } = result.data;

  return (
    <section className="bg-white py-14 sm:py-20 border-b border-gray6" id="featured-guides">
      <Container>
        <SectionHeading
          eyebrow="EDITOR'S CHOICE"
          title="Handpicked reading for your upcoming trip"
          text="Deep dives into seasonal migrations, heritage walks, and transit pacing written by in-region destination specialists."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Main Large Featured Guide Card (7 cols) */}
          <article className="lg:col-span-7 group flex flex-col overflow-hidden rounded-2xl border border-gray6 bg-white transition-all hover:border-gray5 hover:shadow-xl">
            <Link
              href={`/travel-guide/${featured.slug}`}
              className="relative aspect-[16/10] overflow-hidden bg-gray5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              data-analytics-id={`featured-guide-cover-${featured.slug}`}
            >
              <Image
                src={featured.coverImage}
                alt={featured.coverImageAlt || featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4">
                <Badge variant="accent" className="text-xs uppercase tracking-wider font-semibold shadow-sm">
                  {featured.category}
                </Badge>
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs text-text-secondary mb-3">
                <time dateTime={featured.publishedAt} className="caption text-text-secondary">
                  {featured.publishedAt}
                </time>
                <span>•</span>
                <span className="flex items-center gap-1 caption text-text-secondary">
                  <FiClock aria-hidden="true" />
                  {featured.readingTime}
                </span>
                <span>•</span>
                <span className="caption font-medium text-dark">{featured.destination?.name}</span>
              </div>

              <h3 className="title1 text-dark sm:heading mb-3 transition-colors group-hover:text-accent">
                <Link
                  href={`/travel-guide/${featured.slug}`}
                  data-analytics-id={`featured-guide-title-${featured.slug}`}
                >
                  {featured.title}
                </Link>
              </h3>

              <p className="body3 text-text-secondary leading-relaxed mb-6 line-clamp-3">
                {featured.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-gray6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold text-xs">
                    VT
                  </div>
                  <span className="caption font-medium text-dark">{featured.author?.name}</span>
                </div>

                <Button
                  href={`/travel-guide/${featured.slug}`}
                  variant="primary"
                  size="sm"
                  rightIcon={<FiArrowRight aria-hidden="true" />}
                  data-analytics-id={`featured-guide-cta-${featured.slug}`}
                >
                  Read the guide
                </Button>
              </div>
            </div>
          </article>

          {/* Compact Editor's Picks (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-gray6 pb-3 mb-2">
              <FiBookOpen className="text-accent" aria-hidden="true" />
              <h3 className="title4 font-bold text-dark uppercase tracking-wider text-xs">
                MORE EDITOR PICKS
              </h3>
            </div>

            {editorsPicks.map((item) => (
              <article
                key={item.id}
                className="group flex gap-4 rounded-xl border border-gray6 bg-white p-4 transition-all hover:border-gray5 hover:shadow-md"
              >
                <Link
                  href={`/travel-guide/${item.slug}`}
                  className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-gray5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  data-analytics-id={`editor-pick-img-${item.slug}`}
                >
                  <Image
                    src={item.coverImage}
                    alt={item.coverImageAlt || item.title}
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
                      <span className="caption text-accent font-semibold">{item.category}</span>
                      <span>•</span>
                      <span className="caption">{item.readingTime}</span>
                    </div>

                    <h4 className="title4 text-dark line-clamp-2 transition-colors group-hover:text-accent">
                      <Link
                        href={`/travel-guide/${item.slug}`}
                        data-analytics-id={`editor-pick-title-${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </h4>
                  </div>

                  <span className="caption flex items-center gap-1 font-semibold text-accent group-hover:underline pt-2">
                    <span>Read guide</span>
                    <FiArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
