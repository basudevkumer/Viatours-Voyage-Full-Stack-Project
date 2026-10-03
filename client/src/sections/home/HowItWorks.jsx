import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import { howItWorksSteps } from "./data";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export default function HowItWorks() {
  return (
    <Section bg="white" spacing="md" id="how-it-works">
      <SectionHeading
        eyebrow="SIMPLE & TRANSPARENT PROCESS"
        title="From first idea to the trail ahead"
        text="A clear, confidence-first booking process keeps the joy in travel planning and leaves the stress behind."
        align="center"
      />

      <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {howItWorksSteps.map((step) => (
          <li
            key={step.step}
            className="relative flex flex-col justify-between rounded-2xl border border-gray6 bg-white p-7 shadow-xs transition-shadow hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="caption font-bold text-accent">{step.step}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-field text-dark font-semibold text-xs">
                  STEP
                </span>
              </div>

              <h3 className="title2 mt-6 text-dark">{step.title}</h3>
              <p className="body3 mt-2.5 text-text-secondary">{step.text}</p>
            </div>

            {/* Reassurance line under each step */}
            <div className="mt-6 flex items-start gap-2 border-t border-gray6 pt-4 text-dark/80">
              <FiCheck aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
              <p className="body5 font-medium">{step.reassurance}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* CTA following the steps */}
      <div className="mt-12 text-center">
        <Button
          href="/tours"
          variant="primary"
          size="lg"
          data-analytics-id="how-it-works-cta"
          rightIcon={<FiArrowRight aria-hidden="true" />}
        >
          Explore curated tours
        </Button>
      </div>
    </Section>
  );
}
