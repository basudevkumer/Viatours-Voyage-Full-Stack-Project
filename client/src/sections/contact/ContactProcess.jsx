// TODO(content): Confirm true internal communication SLA and coordination process workflow.

import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ProcessSteps from "@/components/shared/ProcessSteps";

const contactSteps = [
  {
    step: "01",
    title: "You submit your details",
    text: "Share your rough dates, destination preferences, booking reference, or specific questions via our encrypted form.",
    reassurance: "Zero unsolicited sales spam or third-party marketing",
  },
  {
    step: "02",
    title: "Specialist review",
    text: "An experienced travel coordinator reviews itinerary feasibility, route pacing, or booking files personally.",
    reassurance: "Human review by certified destination coordinators",
  },
  {
    step: "03",
    title: "Direct personalized reply",
    text: "We reply via email with an itemized proposal, quote, or booking resolution — or call during your requested time window.",
    reassurance: "Clear, transparent pricing with zero pressure to book",
  },
];

export default function ContactProcess() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" aria-label="What happens next">
      <Container>
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="TRANSPARENT WORKFLOW"
            title="What happens after you send a message"
            text="Every inquiry is routed directly to specialized coordinators. Here is how we handle your request."
            align="center"
          />

          <ProcessSteps
            steps={contactSteps}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          />
        </div>
      </Container>
    </section>
  );
}
