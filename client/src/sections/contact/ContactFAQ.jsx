import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { SITE_CONFIG } from "@/lib/site";

export const contactFaqs = [
  {
    question: "How can I ask about an existing booking?",
    answer: `If you have an existing reservation, select the "Booking support" tab on this page and enter your booking reference (e.g., VV-XXXXX) along with the traveler name. Our customer operations desk will immediately retrieve your booking record to help with date changes, logistics, or hotel adjustments. You can also reach us by email at ${SITE_CONFIG.email}.`,
  },
  {
    question: "Can you help me plan a custom trip or private itinerary?",
    answer: `Yes. Select "Plan a trip" and share your dream destination, approximate travel dates, traveler count, and personal style. An experienced destination coordinator will evaluate pacing, availability, and routing, then prepare a tailored, transparent itinerary proposal with zero obligation.`,
  },
  {
    question: "What details should I include in my initial message?",
    answer: `For trip planning, sharing your approximate travel month, group size, preferred pacing, and any must-see sights is most helpful. For existing bookings, provide your reservation reference. Please note: for security reasons, never include credit card numbers, CVVs, or account passwords in any message.`,
  },
  {
    question: "How do you handle and protect my personal data?",
    answer: `We use your submitted contact information exclusively to answer your specific inquiry or assemble requested travel proposals. We never sell or license traveler information to third-party marketing brokers. Inquiries are stored securely and you may request data deletion at any time.`,
  },
  {
    question: "How do partnership and local guide applications work?",
    answer: `Select "Partner with us" above and provide your business name, operating region, and the types of experiences or tour services you offer. Our partner onboarding desk reviews operator licensing, safety standards, and traveler reviews, responding with verification guidelines and listing options.`,
  },
  {
    question: "What is the best way to contact your team for urgent matters?",
    answer: `For urgent inquiries regarding tours starting within 48 hours, call our customer desk at ${SITE_CONFIG.phoneDisplay} during operating hours (${SITE_CONFIG.hours}), or email ${SITE_CONFIG.email} with "URGENT" and your booking reference in the subject line.`,
  },
];

export default function ContactFAQ() {
  const accordionItems = contactFaqs.map((f) => [f.question, f.answer]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="contact-faq" aria-label="Frequently asked questions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title="Common questions about reaching our team"
            text="Factual answers regarding bookings, custom trip planning, communication, and security standards."
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
