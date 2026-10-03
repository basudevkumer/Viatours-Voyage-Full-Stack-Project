import Section from "@/components/shared/Section";
import Button from "@/components/ui/Button";
import { FiPhoneCall, FiMail, FiCalendar, FiClock } from "react-icons/fi";

export default function TravelExpertBlock() {
  return (
    <Section bg="white" spacing="md" id="expert-consultation">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray6 bg-gradient-to-br from-white to-gray7/50 p-6 sm:p-10 shadow-xs">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <span className="caption mb-2 inline-block font-semibold uppercase tracking-wider text-accent">
              DIRECT SPECIALIST ACCESS
            </span>
            <h2 className="title1 mb-3 text-dark">
              Prefer to talk it through with a destination specialist?
            </h2>
            <p className="body3 mb-6 text-text-secondary">
              Whether you need advice choosing between islands in Indonesia or timing seasonal crowds in Europe, our coordinators provide straightforward, verified advice.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="tel:18004536744"
                className="flex items-center gap-3 rounded-xl border border-gray6 bg-white p-3.5 transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                data-analytics-id="expert-phone-click"
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
                data-analytics-id="expert-email-click"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <FiMail aria-hidden="true" />
                </div>
                <div>
                  <span className="caption block text-text-secondary">Email support</span>
                  <span className="title4 font-bold text-dark">hi@viatours.com</span>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start rounded-xl border border-accent/20 bg-accent/5 p-6 md:col-span-5">
            <div className="mb-2 flex items-center gap-2 text-accent">
              <FiCalendar size={20} aria-hidden="true" />
              <span className="title4 font-semibold text-dark">1-on-1 Consultation</span>
            </div>
            <p className="body5 mb-4 text-text-secondary">
              Reserve a 15-minute scheduled call. We review routes, budget tiers, and answer questions.
            </p>
            <div className="mb-6 flex items-center gap-2 caption text-text-secondary">
              <FiClock className="text-accent" aria-hidden="true" />
              <span>Response within 24h</span>
            </div>
            <Button
              href="#plan-my-trip"
              variant="primary"
              size="md"
              fullWidth
              data-analytics-id="expert-call-cta"
            >
              Book a free consultation
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
