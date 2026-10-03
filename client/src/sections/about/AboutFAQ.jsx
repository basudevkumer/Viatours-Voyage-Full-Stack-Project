import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { aboutFaqs } from "./data";

export default function AboutFAQ() {
  const accordionItems = aboutFaqs.map((f) => [f.question, f.answer]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aboutFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="about-faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="COMMON INQUIRIES"
            title="Frequently asked questions about our company"
            text="Factual information about our platform, curation policies, and operations."
            align="center"
          />

          <Accordion
            items={accordionItems}
            defaultOpen={0}
            className="shadow-xs"
          />
        </div>
      </Container>
    </section>
  );
}
