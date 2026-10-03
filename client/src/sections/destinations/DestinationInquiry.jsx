"use client";

import { useState } from "react";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import FormField from "@/components/ui/FormField";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { submitTripInquiry } from "@/services/leadService";
import { destinationsData } from "./data";
import { FiCheckCircle, FiClock, FiShield, FiSend, FiUserCheck } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function DestinationInquiry({
  type = "trip",
  preselectedDestination = "",
  title,
  subtitle,
  id = "plan-my-trip",
  className,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: preselectedDestination || "",
    travelMonth: "Flexible",
    travelers: "2 travelers",
    budgetRange: "Flexible",
    notes: "",
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitResult, setSubmitResult] = useState(null);

  const headingTitle =
    title ||
    (type === "group"
      ? "Request a customized group quote"
      : type === "call"
      ? "Schedule a free travel consultation"
      : "Let our specialists design your dream itinerary");

  const headingText =
    subtitle ||
    (type === "group"
      ? "Private coaches, multi-room bookings, and personalized schedules for 8+ travelers. Fast quotes within 24 hours."
      : type === "call"
      ? "Speak directly with an in-destination travel coordinator to align routes, budgets, and recommendations."
      : "Share your rough dates, interests, and style. We'll assemble a bespoke proposal with zero obligation.");

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.consent) {
      errs.consent = "You must agree to receive your itinerary advice.";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await submitTripInquiry({
        ...formData,
        type,
      });

      if (res.success) {
        setSubmitResult({ success: true, message: res.message });
      } else {
        setSubmitResult({ success: false, message: res.message || "Failed to submit inquiry." });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: "An unexpected error occurred. Please try again or email us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitResult(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: preselectedDestination || "",
      travelMonth: "Flexible",
      travelers: "2 travelers",
      budgetRange: "Flexible",
      notes: "",
      consent: true,
    });
  };

  return (
    <Section bg="grey" spacing="md" id={id} className={className}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow={type === "group" ? "GROUP & CORPORATE TRAVEL" : type === "call" ? "EXPERT CONSULTATION" : "CUSTOM TRIP PLANNING"}
          title={headingTitle}
          text={headingText}
          align="center"
        />

        <div className="overflow-hidden rounded-2xl border border-gray6 bg-white shadow-xs">
          {submitResult?.success ? (
            <div className="p-8 text-center sm:p-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                <FiCheckCircle size={32} />
              </div>
              <h3 className="title2 mb-2 text-dark">Inquiry received!</h3>
              <p className="body3 mx-auto mb-6 max-w-lg text-text-secondary">
                {submitResult.message}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="secondary" onClick={handleReset} data-analytics-id="lead-reset">
                  Submit another request
                </Button>
                <Button href="/tours" variant="primary" data-analytics-id="lead-browse-tours">
                  Explore available tours
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 md:p-10">
              {submitResult?.success === false && (
                <div className="mb-6 rounded-xl border border-error/20 bg-error/10 p-4 body4 text-error">
                  {submitResult.message}
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Name */}
                <FormField label="Full Name" required error={errors.name}>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    autoComplete="name"
                    required
                  />
                </FormField>

                {/* Email */}
                <FormField label="Email Address" required error={errors.email}>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    autoComplete="email"
                    required
                  />
                </FormField>

                {/* Phone (Optional) */}
                <FormField label="Phone / WhatsApp" helperText="Optional, for quick coordinator updates">
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                  />
                </FormField>

                {/* Target Destination */}
                <FormField label="Destination of Interest">
                  <Select
                    name="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  >
                    <option value="">Flexible / Multiple Destinations</option>
                    {destinationsData.map((d) => (
                      <option key={d.slug} value={d.name}>
                        {d.name}, {d.country}
                      </option>
                    ))}
                  </Select>
                </FormField>

                {/* Travel Month */}
                <FormField label="Approximate Timing">
                  <Select
                    name="travelMonth"
                    value={formData.travelMonth}
                    onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                  >
                    <option value="Flexible">I&apos;m flexible with dates</option>
                    <option value="Within 1 month">Within the next 30 days</option>
                    <option value="1-3 months">1 to 3 months away</option>
                    <option value="3-6 months">3 to 6 months away</option>
                    <option value="6+ months">More than 6 months away</option>
                  </Select>
                </FormField>

                {/* Travelers */}
                <FormField label="Group Size">
                  <Select
                    name="travelers"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  >
                    <option value="Solo (1 traveler)">Solo (1 traveler)</option>
                    <option value="Couple (2 travelers)">Couple (2 travelers)</option>
                    <option value="Small group (3–5)">Small group (3–5 travelers)</option>
                    <option value="Medium group (6–12)">Medium group (6–12 travelers)</option>
                    <option value="Large group / Corporate (13+)">Corporate / Event (13+ travelers)</option>
                  </Select>
                </FormField>

                {/* Budget Range */}
                <FormField label="Estimated Budget Pace" className="sm:col-span-2">
                  <Select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  >
                    <option value="Flexible">I&apos;m flexible / Need advice</option>
                    <option value="Under $1,500 per person">Under $1,500 per person</option>
                    <option value="$1,500–$3,000 per person">$1,500–$3,000 per person</option>
                    <option value="$3,000–$6,000 per person">$3,000–$6,000 per person</option>
                    <option value="$6,000+ per person">$6,000+ per person (Bespoke luxury)</option>
                  </Select>
                </FormField>

                {/* Notes */}
                <FormField
                  label="Tell us about your trip vision"
                  helperText="Mention dietary requirements, pacing, bucket list sights, or special celebrations."
                  className="sm:col-span-2"
                >
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    placeholder="e.g. Planning a 10th anniversary trip. We love wine tastings, light morning hikes, and historic boutique stays."
                  />
                </FormField>

                {/* Consent */}
                <div className="sm:col-span-2">
                  <Checkbox
                    id="lead-consent"
                    label="I agree to receive a tailored travel proposal and itinerary recommendations from Viatours coordinators via email."
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    error={errors.consent}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray6 pt-6 sm:flex-row">
                <div className="flex items-center gap-2 caption text-text-secondary">
                  <FiShield className="text-accent" aria-hidden="true" />
                  <span>Zero spam. Direct coordinator response within 24h.</span>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  rightIcon={<FiSend aria-hidden="true" />}
                  data-analytics-id="lead-form-submit"
                  className="w-full sm:w-auto"
                >
                  {type === "group"
                    ? "Request group quote"
                    : type === "call"
                    ? "Confirm consultation slot"
                    : "Send my trip request"}
                </Button>
              </div>
            </form>
          )}

          {/* Reassurance footer strip */}
          <div className="grid grid-cols-1 divide-y divide-gray6 border-t border-gray6 bg-gray7/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex items-center gap-2.5 p-4 body5 text-text-secondary">
              <FiClock className="shrink-0 text-accent" aria-hidden="true" />
              <span>24-hour turnaround guaranteed</span>
            </div>
            <div className="flex items-center gap-2.5 p-4 body5 text-text-secondary">
              <FiUserCheck className="shrink-0 text-accent" aria-hidden="true" />
              <span>Native destination specialists</span>
            </div>
            <div className="flex items-center gap-2.5 p-4 body5 text-text-secondary">
              <FiShield className="shrink-0 text-accent" aria-hidden="true" />
              <span>Free quote with zero obligation</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
