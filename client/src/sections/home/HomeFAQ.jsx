import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { homeFaqs } from "./data";

export default function HomeFAQ() {
  const accordionPairs = homeFaqs.map((faq) => [faq.question, faq.answer]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Section bg="white" spacing="md" id="faq">
      {/* FAQPage JSON-LD Schema strictly matching visible Q&As */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-[840px]">
        <SectionHeading
          eyebrow="CLEAR QUESTIONS & ANSWERS"
          title="Frequently asked questions"
          text="Everything you need to know about booking flexibility, payment security, local guides, and 24/7 on-trip assistance."
          align="center"
        />

        <div className="mt-8">
          <Accordion
            items={accordionPairs}
            multiple={false}
            defaultOpen={0}
            className="shadow-xs"
          />
        </div>
      </div>
    </Section>
  );
}
