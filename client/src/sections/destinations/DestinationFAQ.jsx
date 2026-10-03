import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { destinationsGeneralFaqs } from "./data";

export default function DestinationFAQ({ faqs = destinationsGeneralFaqs, title, eyebrow, text }) {
  const accordionItems = faqs.map((f) => [f.question, f.answer]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <Section bg="grey" spacing="md" id="faqs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow={eyebrow || "FREQUENTLY ASKED QUESTIONS"}
          title={title || "Destination planning & booking queries"}
          text={
            text ||
            "Everything you need to know about choosing regions, seasonal travel, visa guidelines, and custom itinerary options."
          }
          align="center"
        />

        <Accordion items={accordionItems} defaultOpen={0} className="shadow-xs" />
      </div>
    </Section>
  );
}
