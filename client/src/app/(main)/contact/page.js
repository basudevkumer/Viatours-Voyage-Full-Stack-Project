import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site";
import ContactHero from "@/sections/contact/ContactHero";
import ContactHub from "@/sections/contact/ContactHub";
import ContactProcess from "@/sections/contact/ContactProcess";
import ContactQuickHelp from "@/sections/contact/ContactQuickHelp";
import ContactFAQ from "@/sections/contact/ContactFAQ";
import ContactLocation from "@/sections/contact/ContactLocation";
import ContactNewsletter from "@/sections/contact/ContactNewsletter";
import Skeleton from "@/components/ui/Skeleton";
import Container from "@/components/shared/Container";

export const metadata = createMetadata({
  title: `Contact Us & Travel Planning Hub | ${SITE_CONFIG.name}`,
  description: `Reach our travel specialists, request bespoke trip proposals, get booking support, or discuss local partner opportunities. Honest advice and zero sales pressure.`,
  path: "/contact",
});

function ContactHubSkeleton() {
  return (
    <div className="bg-bg-field py-10 sm:py-16">
      <Container>
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl bg-white" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <Skeleton className="h-96 rounded-2xl bg-white" />
            <Skeleton className="h-80 rounded-2xl bg-white" />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${SITE_CONFIG.url}/contact`,
      },
    ],
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_CONFIG.name}`,
    url: `${SITE_CONFIG.url}/contact`,
    description: `Get in touch with the ${SITE_CONFIG.name} travel planning, customer support, and partner team.`,
    mainEntity: {
      "@type": "TravelAgency",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phoneTel,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address?.street,
        addressLocality: SITE_CONFIG.address?.city,
        addressRegion: SITE_CONFIG.address?.state,
        postalCode: SITE_CONFIG.address?.postalCode,
        addressCountry: SITE_CONFIG.address?.countryCode,
      },
    },
  };

  return (
    <main className="min-h-screen bg-bg-field">
      {/* Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      {/* 1. Hero */}
      <ContactHero />

      {/* 2. Interactive Lead Hub (IntentSelector + LeadForm + ContactMethodCard) */}
      <Suspense fallback={<ContactHubSkeleton />}>
        <ContactHub />
      </Suspense>

      {/* 3. Transparent Process Steps */}
      <ContactProcess />

      {/* 4. Self-Service Quick Resources */}
      <ContactQuickHelp />

      {/* 5. Frequently Asked Questions with visible answers & FAQPage schema */}
      <ContactFAQ />

      {/* 6. Office Location & Map (only if address exists) */}
      <ContactLocation />

      {/* 7. Low-emphasis Newsletter & Back-to-top */}
      <ContactNewsletter />
    </main>
  );
}
