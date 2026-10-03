import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FeatureItem from "@/components/shared/FeatureItem";
import { FiCompass, FiShield, FiCreditCard, FiHeadphones } from "react-icons/fi";

const confidenceItems = [
  {
    icon: FiCreditCard,
    title: "Transparent pricing",
    description: "Clear inclusions, upfront base rates, and zero surprise booking fees at checkout.",
  },
  {
    icon: FiShield,
    title: "Flexible cancellation",
    description: "Cancellation terms are shown clearly on every tour before booking with 48h refunds.",
  },
  {
    icon: FiCompass,
    title: "Verified native guides",
    description: "Travel with licensed regional experts who know their homeland from the inside.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 human care",
    description: "Direct phone and WhatsApp coordinator support before, during, and after your trip.",
  },
];

export default function TravelConfidence() {
  return (
    <section className="bg-white py-14 sm:py-20" id="travel-confidence">
      <Container>
        <SectionHeading
          eyebrow="WHY BOOK WITH VIATOURS"
          title="Travel with genuine confidence"
          text="The operational details matter. We make the important parts of booking straightforward and dependable."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {confidenceItems.map((item, index) => (
            <FeatureItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              className="border border-gray6 shadow-xs"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
