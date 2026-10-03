import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { faqs } from "./data";

export default function ExperienceFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <section className="py-14 sm:py-20" id="experience-faqs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading
            eyebrow="NEED TO KNOW"
            title="Questions before you book?"
            text="Clear practical details regarding cancellation, guide credentials, and custom day planning make it easy to choose with confidence."
            align="center"
          />
          <Accordion items={faqs} defaultOpen={0} />
        </div>
      </Container>
    </section>
  );
}
