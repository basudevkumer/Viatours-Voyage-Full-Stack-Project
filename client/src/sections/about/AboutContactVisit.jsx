import Image from "next/image";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactInfoBlock from "@/components/shared/ContactInfoBlock";
import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/site";
import { contactUrl } from "@/lib/routes";
import allImages from "@/components/helper/imageProvider";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

export default function AboutContactVisit() {
  return (
    <section className="border-t border-gray6 bg-gray7/40 py-12 sm:py-16 lg:py-20" id="contact-visit">
      <Container>
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title="Direct assistance & registered details"
          text="We believe in being reachable. Connect with our dedicated support team or visit our central customer service desk."
          action={
            <Button
              href={contactUrl({ type: "question", source: "about-contact-visit" })}
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight aria-hidden="true" />}
              data-analytics-id="about-contact-page-link"
            >
              Contact form & FAQ
            </Button>
          }

        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Contact Details Grid */}
          <div className="space-y-6">
            <ContactInfoBlock config={SITE_CONFIG} />

            <div className="rounded-2xl border border-gray6 bg-white p-5 sm:p-6 shadow-xs">
              <span className="caption block font-semibold text-accent">
                CENTRAL TRAVEL DESK
              </span>
              <h4 className="title3 mt-1 text-dark">
                Planning assistance available seven days a week
              </h4>
              <p className="body4 mt-2 text-text-secondary leading-relaxed">
                Whether inquiring about private tour customisation, group rates, or departure windows, our team handles all communications in-house without automated deflection bots.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  href={`tel:${SITE_CONFIG.phoneTel}`}
                  size="sm"
                  data-analytics-id="about-contact-call-direct"
                >
                  Call {SITE_CONFIG.phoneDisplay}
                </Button>
                <Button
                  href={`mailto:${SITE_CONFIG.email}`}
                  variant="outline"
                  size="sm"
                  data-analytics-id="about-contact-email-direct"
                >
                  Send email
                </Button>
              </div>
            </div>
          </div>

          {/* Map Graphic Block (No external API keys in code) */}
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-gray6 bg-white p-6 shadow-xs">
            <div className="absolute inset-0 bg-gray7/60">
              {allImages.map && (
                <Image
                  src={allImages.map}
                  alt="Viatours Voyage operational map"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover opacity-80"
                />
              )}
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end">
              <div className="rounded-2xl border border-gray6 bg-white/95 p-5 backdrop-blur-md shadow-md">
                <div className="flex items-center gap-2 text-accent">
                  <FiMapPin className="text-lg shrink-0" aria-hidden="true" />
                  <span className="caption font-bold text-dark">
                    Corporate Office Location
                  </span>
                </div>
                <p className="body4 mt-1 font-medium text-dark">
                  {SITE_CONFIG.address?.formatted}
                </p>
                <span className="caption mt-1 block text-text-secondary">
                  Open for scheduled appointments & trade partner consultations
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
