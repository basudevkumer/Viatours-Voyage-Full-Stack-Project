import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ProcessSteps from "@/components/shared/ProcessSteps";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function AboutHowItWorks({ processSteps = [] }) {
  if (!processSteps.length) return null;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="how-it-works">
      <Container>
        <SectionHeading
          eyebrow="OUR PROCESS"
          title="From first idea to the trail ahead"
          text="A transparent, four-step journey designed to keep trip planning calm, predictable, and fully supported."
          align="center"
        />

        <ProcessSteps steps={processSteps} />

        <div className="mt-12 flex justify-center">
          <Button
            href="/tours"
            size="lg"
            rightIcon={<FiArrowRight aria-hidden="true" />}
            data-analytics-id="about-how-it-works-tours"
            className="hover:!bg-white hover:!text-accent"
          >
            Explore curated tours
          </Button>
        </div>
      </Container>
    </section>
  );
}
