import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { FiShield, FiTag, FiDollarSign, FiClock, FiLock, FiHeadphones } from "react-icons/fi";

export default function HowDealsWork({ terms = [] }) {
  const trustFeatures = [
    {
      icon: <FiTag className="text-accent text-2xl" aria-hidden="true" />,
      title: "Audited 'Was' pricing",
      description:
        "Every strikethrough rate is audited against actual standard tariffs charged in the preceding 90 days. Never inflated.",
    },
    {
      icon: <FiDollarSign className="text-success text-2xl" aria-hidden="true" />,
      title: "All-inclusive transparency",
      description:
        "Park fees, audio headsets, and listed tastings are included. Taxes and transaction fees are shown upfront before payment.",
    },
    {
      icon: <FiShield className="text-accent text-2xl" aria-hidden="true" />,
      title: "Full refund protection",
      description:
        "Promotional departures with free cancellation retain 100% refund eligibility up to 24 or 48 hours before start.",
    },
    {
      icon: <FiClock className="text-accent text-2xl" aria-hidden="true" />,
      title: "Zero false urgency",
      description:
        "No ticking timers or fake viewer counts. Dates reflect genuine operator shoulder allotments.",
    },
    {
      icon: <FiLock className="text-accent text-2xl" aria-hidden="true" />,
      title: "Encrypted payments",
      description:
        "Payment info is processed via PCI-DSS compliant gateways with instant digital vouchers.",
    },
    {
      icon: <FiHeadphones className="text-accent text-2xl" aria-hidden="true" />,
      title: "24/7 human support",
      description:
        "Reach our travel desk any time at 1-800-453-6744 or hi@viatours.com with booking questions.",
    },
  ];

  const accordionItems = [
    [
      "How are Viatours 'Was' prices determined?",
      "Every 'Was' (strikethrough) price corresponds to the standard seasonal tariff charged by the tour operator in the preceding 90 days. In accordance with consumer-protection standards, we strictly prohibit temporary price hikes prior to discounting.",
    ],
    [
      "Are deal departures subject to different cancellation terms?",
      "No. Discounted tours and experiences retain the identical cancellation and refund terms as standard-rate bookings. If an itinerary features 'Free cancellation', you can cancel up to 24 or 48 hours beforehand for a 100% refund.",
    ],
    [
      "Are all local taxes and fees included in the deal price?",
      "Yes. All essential entrance fees, permits, and equipment noted in the itinerary are included. Any optional extras (such as private transport upgrades or personal souvenirs) are explicitly listed under Exclusions.",
    ],
    [
      "Why do some deals not have an expiration date?",
      "Deals without an explicit end date are ongoing negotiated shoulder-rate allocations. When the partner operator's reserved capacity is filled, the price simply reverts to the standard tariff without artificial urgency.",
    ],
  ];

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="how-deals-work">
      <Container>
        <SectionHeading
          eyebrow="TRANSPARENCY & INTEGRITY"
          title="How our deals work — without dark patterns"
          text="We believe travelers deserve complete honesty. Here is how we verify rates, protect your booking, and maintain fair pricing."
        />

        {/* 6 Feature Pillars */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustFeatures.map((feat) => (
            <div
              key={feat.title}
              className="flex flex-col rounded-2xl border border-gray6 bg-bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-xs">
                {feat.icon}
              </div>
              <h3 className="title3 text-dark">{feat.title}</h3>
              <p className="body4 mt-2 text-text-secondary">{feat.description}</p>
            </div>
          ))}
        </div>

        {/* Deep-dive Details Accordion */}
        <div className="mt-12">
          <h3 className="title2 mb-6 text-dark">Detailed pricing & policy standards</h3>
          <Accordion items={accordionItems} defaultOpen={0} className="shadow-xs" />
        </div>
      </Container>
    </section>
  );
}
