import { createMetadata } from "@/lib/seo";
import { getDestinations } from "@/services/destinationService";
import PageHeader from "@/components/layout/PageHeader";
import DestinationDirectory from "@/components/shared/DestinationDirectory";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export const metadata = createMetadata({ title: "Destinations | Viatours Voyage", description: "Browse destinations and start planning your next journey.", path: "/destinations" });
export default async function Destinations() {
  const result = await getDestinations();
  return <><PageHeader title="Explore destinations" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]} /><main className="mx-auto max-w-[1320px] px-4 py-10 sm:py-14">{!result.success ? <ErrorState text={result.message} /> : result.data.length ? <DestinationDirectory destinations={result.data} /> : <EmptyState title="Destinations are coming soon" text="Please check back later." action={<Button href="/contact">Contact us</Button>} />}</main></>;
}
