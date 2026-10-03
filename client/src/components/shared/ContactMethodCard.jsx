import { FiPhone, FiMail, FiMapPin, FiClock, FiShield, FiExternalLink } from "react-icons/fi";
import { SITE_CONFIG } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function ContactMethodCard({
  config = SITE_CONFIG,
  className,
}) {
  const mapsSearchUrl = config.address?.formatted
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.address.formatted)}`
    : null;

  return (
    <aside
      aria-label="Direct contact channels and business information"
      className={cn("space-y-4", className)}
    >
      {/* Primary Channels Card */}
      <div className="rounded-2xl border border-gray6 bg-white p-5 shadow-xs sm:p-6">
        <h3 className="title3 text-dark">Direct communication</h3>
        <p className="body5 mt-1 text-text-secondary">
          Reach our customer coordination desk directly during operating hours.
        </p>

        <div className="mt-5 space-y-4 divide-y divide-gray6/70">
          {/* Phone */}
          {config.phone && (
            <div className="pt-3 first:pt-0">
              <span className="caption block font-semibold text-text-secondary">
                Toll-free customer desk
              </span>
              <a
                href={`tel:${config.phoneTel}`}
                data-analytics-id="contact-sidebar-phone"
                className="title4 mt-1 inline-flex items-center gap-2 text-dark hover:text-accent transition-colors"
              >
                <FiPhone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{config.phoneDisplay}</span>
              </a>
            </div>
          )}

          {/* Email */}
          {config.email && (
            <div className="pt-3">
              <span className="caption block font-semibold text-text-secondary">
                Direct inquiries & bookings
              </span>
              <a
                href={`mailto:${config.email}`}
                data-analytics-id="contact-sidebar-email"
                className="title4 mt-1 inline-flex items-center gap-2 break-all text-dark hover:text-accent transition-colors"
              >
                <FiMail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{config.email}</span>
              </a>
            </div>
          )}

          {/* Office Address */}
          {config.address?.formatted && (
            <div className="pt-3">
              <span className="caption block font-semibold text-text-secondary">
                Headquarters
              </span>
              <div className="mt-1 flex items-start gap-2">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div className="body4 text-dark font-medium">
                  {config.address.formatted}
                  {mapsSearchUrl && (
                    <a
                      href={mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="caption mt-1 inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      Get directions
                      <FiExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Opening Hours (Rendered only if real in config) */}
          {config.hours && (
            <div className="pt-3">
              <span className="caption block font-semibold text-text-secondary">
                Operating desk hours
              </span>
              <div className="mt-1 flex items-center gap-2 body4 text-dark font-medium">
                <FiClock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{config.hours}</span>
              </div>
            </div>
          )}

          {/* Expected Response SLA (Rendered only if real in config) */}
          {config.responseExpectation && (
            <div className="pt-3">
              <span className="caption block font-semibold text-text-secondary">
                Response expectation
              </span>
              <div className="mt-1 flex items-center gap-2 body4 text-dark font-medium">
                <span className="h-2 w-2 rounded-full bg-success"></span>
                <span>{config.responseExpectation}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security & Confidentiality Callout */}
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
            <FiShield className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h4 className="title4 text-amber-900">Security notice</h4>
            <p className="body5 mt-1 text-amber-800/90 leading-relaxed">
              Never share credit card numbers, CVVs, or account passwords in messages or emails.
              Our coordinators will never ask for payment info via unencrypted communications.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="rounded-2xl border border-gray6 bg-gray7/60 p-5 body5 text-text-secondary">
        <p className="leading-relaxed">
          <strong className="text-dark font-semibold">Privacy assurance:</strong> Your details are used exclusively to prepare requested travel proposals or answer inquiries. We never sell your personal data.
        </p>
      </div>
    </aside>
  );
}
