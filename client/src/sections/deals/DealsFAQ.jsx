import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";

export const dealsFaqs = [
  {
    question: "How are Viatours travel deals priced?",
    answer:
      "Every deal rate is negotiated directly with local tour operators and verified against standard seasonal prices charged over the preceding 90 days. In strict compliance with fair advertising standards, we never artificially inflate regular prices to manufacture a discount.",
  },
  {
    question: "Can I cancel a deal booking and receive a full refund?",
    answer:
      "Yes. Discounted departures featuring 'Free cancellation' retain their full refund window — typically up to 24 or 48 hours before the tour start time. Your cancellation window is locked at checkout and printed on your digital voucher.",
  },
  {
    question: "Are taxes, park permits, and booking fees included in the price?",
    answer:
      "Yes. All essential entrance tickets, national park permits, licensed guide fees, and listed tastings are included in the displayed tariff. Total taxes and booking charges are itemized transparently before payment with zero surprise checkout fees.",
  },
  {
    question: "How do deal alerts work and how often will I receive emails?",
    answer:
      "When you activate a deal alert, our system tracks verified rate reductions matching your selected destination and travel window. You will only receive an email when a genuine price reduction opens — with zero speculative marketing spam.",
  },
  {
    question: "Can I get custom pricing or discounts for large groups?",
    answer:
      "Yes. For private groups, families, and corporate teams of 6 or more travelers, our dedicated group travel desk coordinates custom allocations and private departures. Request a quote using our group inquiry form for an itemized proposal within 24 hours.",
  },
];

export default function DealsFAQ() {
  const accordionItems = dealsFaqs.map((f) => [f.question, f.answer]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dealsFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="deals-faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title="Everything you need to know about our deals"
            text="Clear, factual answers regarding pricing transparency, refund rights, and alert notifications."
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
