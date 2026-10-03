import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import DealCard from "@/components/shared/DealCard";
import Button from "@/components/ui/Button";
import { getDeals } from "@/services/dealService";
import { FiArrowRight } from "react-icons/fi";

export default async function SpecialDeals() {
  const result = await getDeals({ pageSize: 4 });
  const deals = result.success ? result.data : [];

  // Per CRO rule: Hide the entire section if no authentic deals exist
  if (!deals.length) return null;

  return (
    <Section bg="dark" spacing="md" id="special-deals">
      <SectionHeading
        eyebrow="VERIFIED SEASONAL SAVINGS"
        title="Featured limited offers"
        text="Handpicked itineraries with confirmed rate reductions. Honest discounts without artificial urgency or hidden booking conditions."
        tone="light"
        action={
          <Button
            href="/deals"
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:border-white hover:bg-white hover:text-dark"
            data-analytics-id="special-deals-view-all"
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            See all deals
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {deals.map((deal) => (
          <DealCard key={deal.dealId} deal={deal} />
        ))}
      </div>
    </Section>
  );
}
