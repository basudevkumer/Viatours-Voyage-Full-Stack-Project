import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import FeatureItem from "@/components/shared/FeatureItem";
import { valueProps } from "./data";

export default function WhyChooseUs() {
  return (
    <Section bg="white" spacing="md" id="why-choose-us">
      <SectionHeading
        eyebrow="WHY TRAVEL WITH VIATOURS"
        title="Travel planning with certainty and zero friction"
        text="From initial discovery to the day you return home, every itinerary detail is engineered for clarity, safety, and cultural depth."
        align="center"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {valueProps.map((prop) => (
          <FeatureItem
            key={prop.title}
            icon={prop.icon}
            title={prop.title}
            description={prop.description}
            className="border border-gray6 p-6 shadow-sm hover:border-gray5 hover:shadow-md"
          />
        ))}
      </div>
    </Section>
  );
}
