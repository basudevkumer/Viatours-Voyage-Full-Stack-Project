import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/shared/BlogCard";
import TourCard from "@/components/shared/TourCard";
import ExperienceCard from "@/components/shared/ExperienceCard";
import ShareButton from "@/components/shared/ShareButton";
import GuideBody from "@/components/shared/GuideBody";
import TableOfContents from "@/components/shared/TableOfContents";
import ReadingProgress from "@/components/shared/ReadingProgress";
import NewsletterForm from "@/components/shared/NewsletterForm";
import GuidePlanTripForm from "@/sections/travel-guide/GuidePlanTripForm";
import StickyMobileBar from "@/components/shared/StickyMobileBar";
import {
  getGuideBySlug,
  getRelatedGuides,
  getAdjacentGuides,
} from "@/services/guideService";
import { getTours } from "@/services/tourService";
import { getExperiences } from "@/services/experienceService";
import { guides } from "@/sections/travel-guide/data";
import { createMetadata } from "@/lib/seo";
import {
  FiClock,
  FiMapPin,
  FiArrowRight,
  FiArrowLeft,
  FiPhoneCall,
  FiMail,
  FiCalendar,
  FiCompass,
} from "react-icons/fi";

export async function generateStaticParams() {
  // Prerender both slugs and legacy numeric IDs
  const slugParams = guides.map((g) => ({ slug: g.slug }));
  const idParams = guides.map((g) => ({ slug: String(g.id) }));
  return [...slugParams, ...idParams];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getGuideBySlug(slug);

  if (!result.success || !result.data) {
    return createMetadata({
      title: "Guide Not Found | Viatours Voyage",
      description: "The requested travel guide or field note could not be found.",
      robots: { index: false, follow: false },
    });
  }

  const guide = result.data;
  const imageUrl = typeof guide.coverImage === "string" ? guide.coverImage : guide.coverImage?.src;

  return createMetadata({
    title: `${guide.title} | Viatours Travel Guide`,
    description: guide.excerpt,
    path: `/travel-guide/${guide.slug}`,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt || guide.publishedAt,
      authors: [guide.author?.name || "Viatours Editorial Team"],
      section: guide.category,
      tags: guide.tags,
      images: imageUrl ? [{ url: imageUrl, alt: guide.coverImageAlt || guide.title }] : [],
    },
  });
}

export default async function GuideArticlePage({ params }) {
  const { slug } = await params;
  const result = await getGuideBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const guide = result.data;

  // Parallel fetch contextual content
  const [relatedRes, adjacentRes, toursRes, expsRes] = await Promise.all([
    getRelatedGuides(guide.slug, 3),
    getAdjacentGuides(guide.slug),
    guide.destination?.name ? getTours({ destination: guide.destination.name }) : { data: [] },
    guide.destination?.name
      ? getExperiences({ destination: guide.destination.name })
      : { data: [] },
  ]);

  const relatedGuides = relatedRes.success ? relatedRes.data : [];
  const { prev, next } = adjacentRes.success ? adjacentRes.data : { prev: null, next: null };
  const destinationTours = (toursRes.success ? toursRes.data : []).slice(0, 2);
  const destinationExperiences = (expsRes.success ? expsRes.data : []).slice(0, 2);

  // Extract headings for Table of Contents
  const headings = (guide.body || [])
    .filter((b) => b.type === "heading" && b.id)
    .map((b) => ({ id: b.id, text: b.text, level: b.level || 2 }));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Travel guides", href: "/travel-guide" },
    { label: guide.category, href: `/travel-guide?category=${encodeURIComponent(guide.category)}` },
    { label: guide.title },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: item.href ? `https://viatours.com${item.href}` : undefined,
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    image: typeof guide.coverImage === "string" ? guide.coverImage : guide.coverImage?.src,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
    author: {
      "@type": "Organization",
      name: guide.author?.name || "Viatours Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Viatours Voyage",
      url: "https://viatours.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://viatours.com/travel-guide/${guide.slug}`,
    },
  };

  return (
    <article className="min-h-screen bg-bg-grey pb-20 pt-28 sm:pt-32">
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Container className="max-w-[1320px]">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Article Header */}
        <header className="mb-8 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent" className="text-xs uppercase tracking-wider font-semibold">
              {guide.category}
            </Badge>
            {guide.destination?.name && (
              <Link
                href={`/destinations/${guide.destination.slug}`}
                className="caption flex items-center gap-1 font-medium text-text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FiMapPin className="text-accent" aria-hidden="true" />
                <span>{guide.destination.name} guide</span>
              </Link>
            )}
          </div>

          <h1 className="heading text-dark !text-3xl sm:!text-4xl lg:!text-5xl leading-tight">
            {guide.title}
          </h1>

          <p className="body3 sm:text-xl text-text-secondary leading-relaxed max-w-3xl">
            {guide.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray6 pt-4 text-xs text-text-secondary">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="font-semibold text-dark">{guide.author?.name}</span>
              <span>•</span>
              <time dateTime={guide.publishedAt} className="caption">
                Published {guide.publishedAt}
              </time>
              {guide.updatedAt && (
                <>
                  <span>•</span>
                  <span className="caption text-accent font-medium">
                    Updated {guide.updatedAt}
                  </span>
                </>
              )}
              <span>•</span>
              <span className="flex items-center gap-1 caption">
                <FiClock aria-hidden="true" />
                {guide.readingTime}
              </span>
            </div>

            <ShareButton title={guide.title} text={guide.excerpt} />
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="relative mb-12 aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-gray5 shadow-md">
          <Image
            src={guide.coverImage}
            alt={guide.coverImageAlt || guide.title}
            fill
            priority
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="object-cover"
          />
        </div>

        {/* Two-Column Grid: Body + Sticky Sidebar */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main Content Column */}
          <div className="min-w-0 space-y-12">
            {/* Mobile Collapsible TOC */}
            <div className="lg:hidden">
              <TableOfContents headings={headings} />
            </div>

            {/* Semantic Guide Body Renderer */}
            <GuideBody
              blocks={guide.body}
              destination={guide.destination}
              className="border-b border-gray6 pb-10"
            />

            {/* Contextual Destination Cross-Sell Strip */}
            {(destinationTours.length > 0 || destinationExperiences.length > 0) && (
              <section
                className="rounded-2xl border border-gray6 bg-white p-6 sm:p-8"
                aria-label={`Journeys and activities in ${guide.destination?.name}`}
              >
                <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <span className="caption block uppercase tracking-wider text-accent font-semibold mb-1">
                      FEATURED ITINERARIES
                    </span>
                    <h2 className="title2 text-dark">
                      Experience {guide.destination?.name} firsthand
                    </h2>
                  </div>
                  {guide.destination?.slug && (
                    <Button
                      href={`/destinations/${guide.destination.slug}`}
                      variant="outline"
                      size="sm"
                      rightIcon={<FiArrowRight aria-hidden="true" />}
                    >
                      All {guide.destination.name} guides
                    </Button>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {destinationTours.map((t) => (
                    <TourCard key={t.id} tour={t} />
                  ))}
                  {destinationExperiences.map((e) => (
                    <ExperienceCard key={e.id} experience={e} />
                  ))}
                </div>
              </section>
            )}

            {/* Tags Strip */}
            {guide.tags && guide.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="caption font-medium text-text-secondary mr-2">Tags:</span>
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="caption rounded-full border border-gray5 bg-white px-3 py-1 font-medium text-dark"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Attribution Box */}
            <div className="flex items-start gap-4 rounded-2xl border border-gray6 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-white font-bold text-lg">
                VT
              </div>
              <div className="space-y-1">
                <h4 className="title3 text-dark font-bold">{guide.author?.name}</h4>
                <p className="caption font-semibold text-accent">{guide.author?.role}</p>
                <p className="body4 text-text-secondary pt-1">
                  Written and verified by our destination desk. We coordinate with accredited local guides, park rangers, and regional transport authorities to ensure practical accuracy.
                </p>
              </div>
            </div>

            {/* Prev / Next Article Navigation */}
            {(prev || next) && (
              <nav
                className="grid gap-4 sm:grid-cols-2 border-y border-gray6 py-6"
                aria-label="Adjacent travel guides"
              >
                {prev ? (
                  <Link
                    href={`/travel-guide/${prev.slug}`}
                    className="group flex flex-col rounded-xl border border-gray6 bg-white p-4 transition-all hover:border-accent"
                    data-analytics-id={`guide-prev-${prev.slug}`}
                  >
                    <span className="caption flex items-center gap-1 text-text-secondary group-hover:text-accent mb-1 font-medium">
                      <FiArrowLeft aria-hidden="true" /> Previous Guide
                    </span>
                    <span className="title4 text-dark line-clamp-1">{prev.title}</span>
                  </Link>
                ) : (
                  <div />
                )}

                {next && (
                  <Link
                    href={`/travel-guide/${next.slug}`}
                    className="group flex flex-col items-end text-right rounded-xl border border-gray6 bg-white p-4 transition-all hover:border-accent"
                    data-analytics-id={`guide-next-${next.slug}`}
                  >
                    <span className="caption flex items-center gap-1 text-text-secondary group-hover:text-accent mb-1 font-medium">
                      Next Guide <FiArrowRight aria-hidden="true" />
                    </span>
                    <span className="title4 text-dark line-clamp-1">{next.title}</span>
                  </Link>
                )}
              </nav>
            )}

            {/* End-of-Article Trip Planner Lead Form */}
            <div id="plan-this-trip" className="scroll-mt-28">
              <GuidePlanTripForm preselectedDestination={guide.destination?.name} />
            </div>

            {/* In-Article Newsletter Signup */}
            <div className="rounded-2xl border border-gray6 bg-dark p-6 text-white sm:p-10 text-center">
              <h3 className="heading text-white mb-2 !text-2xl sm:!text-3xl">
                Enjoyed this guide? Get our seasonal drops
              </h3>
              <p className="body4 text-white/80 max-w-lg mx-auto mb-6">
                Receive unreleased walking routes, seasonal booking alerts, and verified advice directly from our regional teams.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm layout="stacked" submitLabel="Subscribe for updates" />
              </div>
            </div>

            {/* Related Guides Row */}
            {relatedGuides.length > 0 && (
              <section className="pt-6" aria-labelledby="related-guides-title">
                <div className="mb-6 flex items-center justify-between">
                  <h3 id="related-guides-title" className="title2 text-dark">
                    Related field guides
                  </h3>
                  <Button
                    href="/travel-guide"
                    variant="outline"
                    size="sm"
                    rightIcon={<FiArrowRight aria-hidden="true" />}
                  >
                    All guides
                  </Button>
                </div>
                <div className="grid gap-6 sm:grid-cols-3">
                  {relatedGuides.map((item) => (
                    <BlogCard
                      key={item.id}
                      image={item.coverImage}
                      category={item.category}
                      date={item.publishedAt}
                      author={item.author?.name}
                      title={item.title}
                      excerpt={item.excerpt}
                      href={`/travel-guide/${item.slug}`}
                      className="border border-gray6 shadow-xs"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Desktop Sidebar (Right Column) */}
          <aside className="hidden lg:block space-y-6 self-start sticky top-28">
            {/* Table of Contents */}
            <TableOfContents headings={headings} />

            {/* "Plan This Trip" CTA Card */}
            <div className="rounded-2xl border border-accent/25 bg-gradient-to-br from-white to-accent/5 p-6 shadow-xs">
              <span className="caption mb-1 block uppercase tracking-wider text-accent font-semibold">
                CURATED TRIP SERVICE
              </span>
              <h4 className="title3 text-dark font-bold mb-2">
                Want to do this itinerary?
              </h4>
              <p className="body5 text-text-secondary leading-relaxed mb-4">
                Our destination team will customize departure dates, book native guides, and handle logistics with free consultation.
              </p>
              <Button
                href="#plan-this-trip"
                variant="primary"
                size="md"
                fullWidth
                rightIcon={<FiArrowRight aria-hidden="true" />}
                data-analytics-id="sidebar-plan-trip-cta"
              >
                Plan this trip
              </Button>
            </div>

            {/* Direct Coordinator Contact Card */}
            <div className="rounded-2xl border border-gray6 bg-white p-6 shadow-xs space-y-3">
              <h4 className="title4 font-bold text-dark">Speak to a specialist</h4>
              <p className="caption text-text-secondary leading-relaxed">
                Connect with our regional team for fast advice on permits, weather, and pacing.
              </p>
              <a
                href="tel:18004536744"
                className="flex items-center gap-2.5 body5 font-bold text-dark hover:text-accent transition-colors"
                data-analytics-id="sidebar-expert-phone"
              >
                <FiPhoneCall className="text-accent" aria-hidden="true" />
                <span>1-800-453-6744</span>
              </a>
              <a
                href="mailto:hi@viatours.com"
                className="flex items-center gap-2.5 body5 text-text-secondary hover:text-accent transition-colors"
                data-analytics-id="sidebar-expert-email"
              >
                <FiMail className="text-accent" aria-hidden="true" />
                <span>hi@viatours.com</span>
              </a>
            </div>

            {/* Destination Link Card */}
            {guide.destination?.slug && (
              <div className="rounded-2xl border border-gray6 bg-white p-5 shadow-xs">
                <Link
                  href={`/destinations/${guide.destination.slug}`}
                  className="group flex items-center justify-between title4 font-semibold text-dark hover:text-accent"
                  data-analytics-id="sidebar-dest-link"
                >
                  <span className="flex items-center gap-2">
                    <FiCompass className="text-accent" aria-hidden="true" />
                    <span>{guide.destination.name} hub</span>
                  </span>
                  <FiArrowRight
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </Container>

      {/* Global Sticky Mobile Action Bar */}
      <StickyMobileBar
        searchHref="/travel-guide#guides"
        searchLabel="Browse guides"
        planHref="#plan-this-trip"
        planLabel="Plan this trip"
      />
    </article>
  );
}
