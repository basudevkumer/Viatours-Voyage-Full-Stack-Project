import { SITE_CONFIG } from "@/lib/site";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function ContactInfoBlock({ config = SITE_CONFIG, className }) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2", className)}>
      {/* Phone */}
      <div className="flex items-start gap-3.5 rounded-2xl border border-gray6 bg-white p-5 shadow-xs">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-field text-accent">
          <FiPhone className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <span className="caption block font-semibold text-text-secondary">
            Toll-free customer support
          </span>
          <a
            href={`tel:${config.phoneTel}`}
            className="title3 mt-0.5 block text-dark hover:text-accent transition-colors"
          >
            {config.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3.5 rounded-2xl border border-gray6 bg-white p-5 shadow-xs">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-field text-accent">
          <FiMail className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <span className="caption block font-semibold text-text-secondary">
            Inquiries & support email
          </span>
          <a
            href={`mailto:${config.email}`}
            className="title3 mt-0.5 block text-dark hover:text-accent transition-colors"
          >
            {config.email}
          </a>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start gap-3.5 rounded-2xl border border-gray6 bg-white p-5 shadow-xs">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-field text-accent">
          <FiMapPin className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <span className="caption block font-semibold text-text-secondary">
            Headquarters & registered address
          </span>
          <p className="body4 mt-0.5 text-dark font-medium">
            {config.address?.formatted}
          </p>
        </div>
      </div>

      {/* Hours */}
      <div className="flex items-start gap-3.5 rounded-2xl border border-gray6 bg-white p-5 shadow-xs">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-field text-accent">
          <FiClock className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <span className="caption block font-semibold text-text-secondary">
            Operational desk hours
          </span>
          <p className="body4 mt-0.5 text-dark font-medium">
            {config.hours}
          </p>
        </div>
      </div>
    </div>
  );
}
