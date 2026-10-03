import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import MapEmbed from "@/components/shared/MapEmbed";
import { SITE_CONFIG } from "@/lib/site";

export default function ContactLocation() {
  if (!SITE_CONFIG.address?.formatted) return null;

  return (
    <section className="bg-bg-field py-12 sm:py-16 lg:py-20" aria-label="Headquarters location">
      <Container>
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="HEADQUARTERS"
            title="Our central office location"
            text="Our corporate office handles management, operator curation, and partner relations."
            align="center"
          />

          <div className="overflow-hidden rounded-2xl border border-gray6 bg-white p-6 shadow-xs">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="title3 text-dark">{SITE_CONFIG.legalName}</h3>
                <p className="body4 mt-1 text-text-secondary">{SITE_CONFIG.address.formatted}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address.formatted)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="title4 inline-flex min-h-11 items-center justify-center rounded-xl bg-bg-field px-4 text-accent hover:bg-accent/10 transition-colors"
              >
                Open in Google Maps
              </a>
            </div>

            <MapEmbed location={SITE_CONFIG.address.formatted} />
          </div>
        </div>
      </Container>
    </section>
  );
}
