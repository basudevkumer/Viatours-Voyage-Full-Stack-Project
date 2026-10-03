import { notFound } from "next/navigation";
import DetailPageContent from "@/components/shared/DetailPageContent";
import { getExperienceById, getRelatedExperiences } from "@/services/experienceService";
import { experiences } from "@/sections/activities/data";
import { createMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    id: String(exp.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getExperienceById(id);

  if (!result.success || !result.data) {
    return createMetadata({
      title: "Experience Not Found | Viatours Voyage",
      description: "The requested activity or experience could not be found.",
      robots: { index: false, follow: false },
    });
  }

  const exp = result.data;
  return createMetadata({
    title: `${exp.title} | Viatours Voyage`,
    description:
      exp.description ||
      `Explore ${exp.title} in ${exp.location}. Verified local host, instant mobile confirmation, and flexible cancellation.`,
    path: `/activities/${id}`,
  });
}

export default async function ExperienceDetailPage({ params }) {
  const { id } = await params;
  const result = await getExperienceById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const exp = result.data;
  const relatedRes = await getRelatedExperiences(id);
  const relatedExperiences = relatedRes.success ? relatedRes.data : [];

  const destinationSlug = exp.destination?.toLowerCase().replace(/\s+/g, "-") || "";

  // Structured Data (JSON-LD)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://viatours.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Experiences",
        item: "https://viatours.com/activities",
      },
      ...(exp.destination
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: exp.destination,
              item: `https://viatours.com/destinations/${destinationSlug}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: exp.title,
              item: `https://viatours.com/activities/${exp.id}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: exp.title,
              item: `https://viatours.com/activities/${exp.id}`,
            },
          ]),
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: exp.title,
    description: exp.description,
    touristType: ["Activity", exp.category],
    offers: {
      "@type": "Offer",
      price: exp.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://viatours.com/activities/${exp.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <DetailPageContent item={exp} itemType="experience" relatedItems={relatedExperiences} />
    </>
  );
}
