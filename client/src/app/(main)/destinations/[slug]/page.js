import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import TourCard from "@/components/shared/TourCard";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Button from "@/components/ui/Button";
import { getDestinationById } from "@/services/destinationService";
import { getTours } from "@/services/tourService";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getDestinationById(slug);
  if (!result.success) return createMetadata({ title: "Destination not found | Viatours Voyage", robots: { index: false, follow: false } });
  return createMetadata({ title: `${result.data.city} | Viatours Voyage`, description: `Explore tours and experiences in ${result.data.city}.`, path: `/destinations/${slug}` });
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  const result = await getDestinationById(slug);
  if (!result.success) notFound();
  const tourResult = await getTours();
  const cityTours = tourResult.success ? tourResult.data.filter((tour) => tour.location.toLowerCase().includes(result.data.city.toLowerCase())) : [];
  return <><PageHeader title={result.data.city} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }, { label: result.data.city }]} /><main className="mx-auto max-w-[1320px] px-4 pb-16"><div className="relative mb-10 aspect-[2/1] overflow-hidden rounded-2xl"><Image src={result.data.image} alt={result.data.city} fill priority sizes="100vw" className="object-cover" /></div><h2 className="title1 mb-5 text-dark">Tours in {result.data.city}</h2>{!tourResult.success ? <ErrorState text={tourResult.message} /> : cityTours.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{cityTours.map((tour) => <TourCard key={tour.id} tour={tour} />)}</div> : <EmptyState title="No tours listed for this destination yet" text="Browse all tours to find another place to explore." action={<Button href="/tours">Explore tours</Button>} />}</main></>;
}
