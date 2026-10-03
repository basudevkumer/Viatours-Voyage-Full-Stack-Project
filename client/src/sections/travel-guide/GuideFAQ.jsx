import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { guideFaqs } from "./data";

export default function GuideFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guideFaqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <section className="bg-white py-14 sm:py-20 border-t border-gray6" id="guide-faqs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED"
            title="Travel planning & guide standards"
            text="How our editorial team reviews itineraries, updates regional transit notes, and maintains objective local guidance."
            align="center"
          />
          <Accordion items={guideFaqs} defaultOpen={0} />
        </div>
      </Container>
    </section>
  );
}
