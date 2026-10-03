import PageHero from "@/components/shared/PageHero";
import { SITE_CONFIG } from "@/lib/site";

export default function ContactHero() {
  return (
    <PageHero
      eyebrow="DIRECT COMMUNICATION"
      title="How can our travel specialists help you?"
      description={`Connect directly with the ${SITE_CONFIG.name} team for custom trip planning, existing booking adjustments, group quotes, or local operator partnerships.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact" },
      ]}
      className="bg-dark text-white"
    />
  );
}
