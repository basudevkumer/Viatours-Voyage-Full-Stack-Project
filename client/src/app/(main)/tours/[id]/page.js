import { notFound } from "next/navigation";
import DetailPageContent from "@/components/shared/DetailPageContent";
import { getTourById } from "@/services/tourService";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getTourById(id);
  if (!result.success) return createMetadata({ title: "Tour not found | Viatours Voyage", robots: { index: false, follow: false } });
  return createMetadata({ title: `${result.data.title} | Viatours Voyage`, description: result.data.description || `Explore ${result.data.title} with Viatours Voyage.`, path: `/tours/${id}` });
}

export default async function TourDetailPage({ params }) {
  const { id } = await params;
  const result = await getTourById(id);
  if (!result.success) notFound();
  return <DetailPageContent item={result.data} itemType="tour" />;
}
