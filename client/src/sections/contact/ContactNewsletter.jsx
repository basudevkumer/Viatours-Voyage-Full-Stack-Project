import Link from "next/link";
import { FiArrowUp } from "react-icons/fi";
import Container from "@/components/shared/Container";
import NewsletterForm from "@/components/shared/NewsletterForm";

export default function ContactNewsletter() {
  return (
    <section className="border-t border-gray6 bg-white py-12 sm:py-16" aria-label="Travel dispatch updates">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="caption font-bold uppercase tracking-wider text-accent">
            STAY INFORMED
          </span>
          <h2 className="title2 mt-1 text-dark">Travel intelligence, without the sales noise</h2>
          <p className="body4 mt-2 text-text-secondary">
            Receive seasonal destination recommendations, honest packing guides, and curated itinerary updates.
          </p>

          <div className="mt-6 flex justify-center">
            <NewsletterForm className="w-full max-w-md" />
          </div>

          <p className="caption mt-3 text-text-muted">
            Strict privacy guarantee. Unsubscribe at any time with one click.
          </p>

          {/* Quiet anchor back to the main form */}
          <div className="mt-8 border-t border-gray6/60 pt-6">
            <a
              href="#contact-form"
              className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-accent transition-colors"
            >
              <FiArrowUp className="h-4 w-4" aria-hidden="true" />
              <span>Back to contact form</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
