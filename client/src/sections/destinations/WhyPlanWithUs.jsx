import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import FeatureItem from "@/components/shared/FeatureItem";
import { destinationValueProps } from "./data";

export default function WhyPlanWithUs() {
  return (
    <Section bg="grey" spacing="md" id="why-plan-with-us">
      <SectionHeading
        eyebrow="WHY TRAVEL WITH VIATOURS"
        title="Thoughtful planning, verified operators, real support"
        text="We focus on operational rigor, safety standards, and transparent conditions so you can explore with confidence."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinationValueProps.map((item, index) => (
          <FeatureItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            className="border border-gray6 shadow-xs"
          />
        ))}
      </div>
    </Section>
  );
}
