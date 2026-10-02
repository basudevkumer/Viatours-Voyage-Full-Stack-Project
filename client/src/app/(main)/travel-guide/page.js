import allImages from "@/components/helper/imageProvider";
import PageHeader from "@/components/layout/PageHeader";
import BlogCard from "@/components/shared/BlogCard";
import EmptyState from "@/components/ui/EmptyState";
import { createMetadata } from "@/lib/seo";
import Button from "@/components/ui/Button";

export const metadata = createMetadata({ title: "Travel Guides | Viatours Voyage", description: "Explore travel inspiration and destination guides.", path: "/travel-guide" });
export default function TravelGuidePage() {
  const articles = allImages.traveItems;
  return <><PageHeader title="Travel guides & inspiration" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Travel guide" }]} /><main className="mx-auto max-w-[1320px] px-4 py-10 sm:py-14"><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><p className="body3 text-text-secondary">Ideas for planning your next trip.</p><Button href="/destinations" variant="secondary">Explore destinations</Button></div>{articles.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <BlogCard key={article.id} {...article} />)}</div> : <EmptyState title="Travel guides are coming soon" text="Check back for destination ideas and practical guides." />}</main></>;
}
