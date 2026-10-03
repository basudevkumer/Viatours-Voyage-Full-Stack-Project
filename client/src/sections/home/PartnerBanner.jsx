import Section from "@/components/shared/Section";
import Button from "@/components/ui/Button";
import { FiGlobe, FiDollarSign, FiCalendar, FiArrowRight } from "react-icons/fi";
import { contactUrl } from "@/lib/routes";


const partnerPerks = [
  {
    icon: FiGlobe,
    title: "Global traveler reach",
    text: "Showcase your authentic itineraries to thousands of international travelers seeking verified local experiences.",
  },
  {
    icon: FiDollarSign,
    title: "Zero upfront listing fees",
    text: "Publish your experiences for free. Transparent, competitive commission applied only on successfully completed bookings.",
  },
  {
    icon: FiCalendar,
    title: "Complete calendar control",
    text: "Set your own seasonal availability, group minimums, and pricing rules with automated scheduled payouts.",
  },
];

export default function PartnerBanner() {
  return (
    <Section bg="white" spacing="md" id="partner-with-us">
      <div className="rounded-3xl border border-gray6 bg-bg-field p-8 sm:p-12 lg:p-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[620px]">
            <p className="caption text-accent">SUPPLY & COMMUNITY GROWTH</p>
            <h2 className="heading mt-2.5 text-dark">
              Are you a licensed guide or boutique operator?
            </h2>
            <p className="body3 mt-3 text-text-secondary">
              Partner with Viatours Voyage to grow your local tour business with qualified travelers, full scheduling freedom, and dedicated platform support.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href={contactUrl({ type: "partner", source: "home-partner-banner" })}
              variant="secondary"
              size="md"
              data-analytics-id="partner-become-a-partner-cta"
              rightIcon={<FiArrowRight aria-hidden="true" />}
            >
              Become a verified partner
            </Button>
          </div>

        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-gray6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {partnerPerks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div key={perk.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-xs">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <div>
                  <h3 className="title3 text-dark">{perk.title}</h3>
                  <p className="body4 mt-1 text-text-secondary">{perk.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
