import { notFound } from "next/navigation";
import DetailPageContent from "@/components/shared/DetailPageContent";
import { getExperienceById } from "@/services/experienceService";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getExperienceById(id);
  if (!result.success) return createMetadata({ title: "Experience not found | Viatours Voyage", robots: { index: false, follow: false } });
  return createMetadata({ title: `${result.data.title} | Viatours Voyage`, description: result.data.description || `Explore ${result.data.title} with Viatours Voyage.`, path: `/activities/${id}` });
}

export default async function ExperienceDetailPage({ params }) {
  const { id } = await params;
  const result = await getExperienceById(id);
  if (!result.success) notFound();
  return <DetailPageContent item={result.data} itemType="experience" />;
}
