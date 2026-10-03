import Section from "@/components/shared/Section";
import Button from "@/components/ui/Button";
import { FiPhoneCall, FiMail, FiCalendar, FiClock } from "react-icons/fi";

export default function ExperiencesExpertBlock() {
  return (
    <Section bg="white" spacing="md" id="expert-suggestions">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray6 bg-gradient-to-br from-white to-gray7/50 p-6 sm:p-10 shadow-xs">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <span className="caption mb-2 inline-block font-semibold uppercase tracking-wider text-accent">
              LOCAL EXPERIENCE CONCIERGE
            </span>
            <h2 className="title1 mb-3 text-dark">
              Talk to an experience specialist
            </h2>
            <p className="body3 mb-6 text-text-secondary">
              Need advice on optimal timing, kid-friendly alternatives, or combining morning and evening activities? Our destination coordinators provide unbiased recommendations with zero sales pressure.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="tel:18004536744"
                className="flex items-center gap-3 rounded-xl border border-gray6 bg-white p-3.5 transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                data-analytics-id="exp-expert-phone-click"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <FiPhoneCall aria-hidden="true" />
                </div>
                <div>
                  <span className="caption block text-text-secondary">Toll-free hotline</span>
                  <span className="title4 font-bold text-dark">1-800-453-6744</span>
                </div>
              </a>

              <a
                href="mailto:hi@viatours.com"
                className="flex items-center gap-3 rounded-xl border border-gray6 bg-white p-3.5 transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                data-analytics-id="exp-expert-email-click"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <FiMail aria-hidden="true" />
                </div>
                <div>
                  <span className="caption block text-text-secondary">Direct email</span>
                  <span className="title4 font-bold text-dark">hi@viatours.com</span>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start rounded-xl border border-accent/20 bg-accent/5 p-6 md:col-span-5">
            <div className="mb-2 flex items-center gap-2 text-accent">
              <FiCalendar size={20} aria-hidden="true" />
              <span className="title4 font-semibold text-dark">Free Activity Advice</span>
            </div>
            <p className="body5 mb-4 text-text-secondary">
              Tell us your destination, dates, and interests for a customized recommendation list.
            </p>
            <div className="mb-6 flex items-center gap-2 caption text-text-secondary">
              <FiClock className="text-accent" aria-hidden="true" />
              <span>Prompt coordinator reply</span>
            </div>
            <Button
              href="#day-plan-inquiry"
              variant="primary"
              size="md"
              fullWidth
              data-analytics-id="exp-expert-call-cta"
            >
              Get a free suggestion
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
