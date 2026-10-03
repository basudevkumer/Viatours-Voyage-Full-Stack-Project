import { notFound } from "next/navigation";
import DetailPageContent from "@/components/shared/DetailPageContent";
import { getTourById, getRelatedTours } from "@/services/tourService";
import { tours } from "@/sections/tours/data";
import { createMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return tours.map((tour) => ({
    id: String(tour.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getTourById(id);

  if (!result.success || !result.data) {
    return createMetadata({
      title: "Tour Not Found | Viatours",
      description: "The requested tour itinerary could not be found.",
      robots: { index: false, follow: false },
    });
  }

  const tour = result.data;
  return createMetadata({
    title: `${tour.title} | Viatours`,
    description:
      tour.description ||
      `Explore ${tour.title} in ${tour.location}. Handcrafted itinerary with verified native local guides and flexible cancellation.`,
    path: `/tours/${id}`,
  });
}

export default async function TourDetailPage({ params }) {
  const { id } = await params;
  const result = await getTourById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const tour = result.data;
  const relatedRes = await getRelatedTours(id);
  const relatedTours = relatedRes.success ? relatedRes.data : [];

  const destinationSlug = tour.destination?.toLowerCase().replace(/\s+/g, "-") || "";

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
        name: "Tours",
        item: "https://viatours.com/tours",
      },
      ...(tour.destination
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: tour.destination,
              item: `https://viatours.com/destinations/${destinationSlug}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: tour.title,
              item: `https://viatours.com/tours/${tour.id}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: tour.title,
              item: `https://viatours.com/tours/${tour.id}`,
            },
          ]),
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    touristType: ["Sightseeing", tour.category],
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://viatours.com/tours/${tour.id}`,
    },
    ...(tour.itinerary?.length
      ? {
          itinerary: tour.itinerary.map((day) => ({
            "@type": "City",
            name: day.title,
            description: day.description,
          })),
        }
      : {}),
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
      <DetailPageContent item={tour} itemType="tour" relatedItems={relatedTours} />
    </>
  );
}
