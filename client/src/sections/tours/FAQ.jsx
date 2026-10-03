import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { faqs } from "./data";

export default function FAQ() {
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
    <section className="py-14 sm:py-20 bg-gray7/30" id="faqs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading
            eyebrow="NEED TO KNOW"
            title="Frequently asked questions about touring"
            text="Essential details on bookings, payment terms, cancellations, and group private departures."
            align="center"
          />
          <Accordion items={faqs} defaultOpen={0} className="shadow-xs" />
        </div>
      </Container>
    </section>
  );
}
