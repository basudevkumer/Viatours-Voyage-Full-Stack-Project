import Section from "@/components/shared/Section";
import NewsletterForm from "@/components/shared/NewsletterForm";
import SectionHeading from "@/components/shared/SectionHeading";
import { FiMail, FiLock } from "react-icons/fi";

const Newsletter = () => (
  <Section bg="cream" spacing="md" id="newsletter">
    <div className="rounded-3xl border border-gray6 bg-white p-8 shadow-sm sm:p-12 lg:p-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[560px]">
          <div className="mb-3 flex items-center gap-2 text-accent">
            <FiMail aria-hidden="true" size={18} />
            <span className="caption font-semibold">CURATED INSPIRATION</span>
          </div>

          <h2 className="heading text-dark">
            Get travel ideas & seasonal dispatches
          </h2>

          <p className="body3 mt-3 text-text-secondary">
            Join thousands of travelers receiving monthly insider destination guides, early access to new itineraries, and quiet season pricing tips.
          </p>

          <p className="body5 mt-4 flex items-center gap-1.5 text-text-secondary">
            <FiLock aria-hidden="true" className="text-accent" />
            No spam. We send 1–2 thoughtful emails per month. Unsubscribe anytime in one click.
          </p>
        </div>

        <div className="w-full max-w-[480px]">
          <NewsletterForm
            layout="inline"
            submitLabel="Join dispatch"
            data-analytics-id="home-newsletter-submit"
          />
        </div>
      </div>
    </div>
  </Section>
);

export default Newsletter;
