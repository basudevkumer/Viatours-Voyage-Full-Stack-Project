import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import NewsletterForm from "@/components/shared/NewsletterForm";
import { FiMail } from "react-icons/fi";

export default function GuideNewsletter() {
  return (
    <section className="bg-white py-14 sm:py-20 border-b border-gray6" id="guide-newsletter">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray6 bg-gray7/60 p-6 sm:p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <FiMail size={24} aria-hidden="true" />
          </div>
          <SectionHeading
            eyebrow="STAY CURIOUS"
            title="Get new guides & seasonal field notes by email"
            text="Fresh neighborhood walking routes, seasonal booking alerts, and honest packing tips delivered twice monthly. Zero spam."
            align="center"
            className="mb-6"
          />
          <div className="mx-auto max-w-md">
            <NewsletterForm layout="stacked" submitLabel="Subscribe to field notes" />
          </div>
        </div>
      </Container>
    </section>
  );
}
