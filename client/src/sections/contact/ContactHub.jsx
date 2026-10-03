"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/shared/Container";
import IntentSelector from "@/components/shared/IntentSelector";
import LeadForm from "@/components/shared/LeadForm";
import ContactMethodCard from "@/components/shared/ContactMethodCard";
import { cn } from "@/lib/cn";

export default function ContactHub() {
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read initial values from URL query parameters
  const rawType = searchParams.get("type") || "trip";
  const source = searchParams.get("source") || "contact-page";
  const item = searchParams.get("item") || "";
  const destination = searchParams.get("destination") || "";

  // Extract UTM parameters safely
  const utmParams = {
    utm_source: searchParams.get("utm_source") || undefined,
    utm_medium: searchParams.get("utm_medium") || undefined,
    utm_campaign: searchParams.get("utm_campaign") || undefined,
    utm_term: searchParams.get("utm_term") || undefined,
    utm_content: searchParams.get("utm_content") || undefined,
  };

  const [selectedIntent, setSelectedIntent] = useState(null);
  const activeIntent = selectedIntent ?? rawType;

  // Handle intent change with URL update without losing scroll position
  const handleIntentChange = (newIntent) => {
    setSelectedIntent(newIntent);

    startTransition(() => {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("type", newIntent);
      window.history.replaceState(null, "", currentUrl.toString());
    });
  };


  return (
    <section
      id="contact-form"
      className="scroll-mt-24 bg-bg-field py-10 sm:py-14 lg:py-16"
      aria-label="Contact and inquiry form hub"
    >
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Intent Selection Area */}
          <div className="mb-8">
            <div className="mb-3 text-center sm:text-left">
              <span className="caption font-bold uppercase tracking-wider text-accent">
                Step 1: Choose inquiry type
              </span>
              <h2 className="title2 mt-1 text-dark">What can we help you coordinate?</h2>
            </div>

            <IntentSelector
              activeIntent={activeIntent}
              onChangeIntent={handleIntentChange}
            />
          </div>

          {/* Form & Sidebar Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_380px]">
            {/* Main Form Column (Always First) */}
            <div>
              <LeadForm
                type={activeIntent}
                source={source}
                prefillItem={item}
                prefillDestination={destination}
                utmParams={utmParams}
              />
            </div>


            {/* Sidebar Column */}
            <div>
              <ContactMethodCard className="sticky top-28" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
