"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import { submitTripInquiry } from "@/services/leadService";
import { FiCompass, FiBriefcase, FiCheckCircle, FiShield, FiArrowRight } from "react-icons/fi";

export default function AboutPartnerBlock() {
  const [partnerType, setPartnerType] = useState("guide"); // "guide" | "agency"
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    role: "Local Tour Operator",
    destination: "",
    email: "",
    phone: "",
    message: "",
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your name and email address.",
      });
      return;
    }

    if (!formData.destination.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your destination or operating region.",
      });
      return;
    }

    if (!formData.consent) {
      setStatus({
        type: "error",
        message: "Please agree to our partner onboarding review terms.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await submitTripInquiry({
        type: "partner",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        business: formData.business.trim(),
        role: formData.role,
        destination: formData.destination.trim(),
        notes: `[Partner Inquiry - ${formData.role}] Destination: ${formData.destination}. Message: ${formData.message}`,
      });

      if (res.success) {
        setSubmitted(true);
        setStatus({ type: "success", message: res.message });
      } else {
        setStatus({
          type: "error",
          message: res.message || "Failed to submit partner application.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="partner-with-us">
      <Container>
        <SectionHeading
          eyebrow="SUPPLY & BUSINESS GROWTH"
          title="Partner with Viatours Voyage"
          text="We work directly with certified local guides, licensed regional operators, and independent travel advisors who share our standard of transparency."
        />

        {/* 2 Audience Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Audience Card 1: Local Guides & Tour Operators */}
          <div
            onClick={() => {
              setPartnerType("guide");
              setFormData((prev) => ({ ...prev, role: "Local Tour Operator" }));
            }}
            className={`cursor-pointer rounded-3xl border p-6 transition-all duration-300 sm:p-8 ${
              partnerType === "guide"
                ? "border-accent bg-bg-card shadow-md"
                : "border-gray6 bg-white hover:border-gray4 shadow-xs"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-accent shadow-xs">
              <FiCompass className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="heading mt-4 text-xl font-bold text-dark sm:text-2xl">
              Local guides & tour operators
            </h3>
            <p className="body4 mt-2 text-text-secondary leading-relaxed">
              List your authentic day experiences or multi-day routes on our catalog. We highlight your native expertise, handle secure payment processing, and connect you with qualified international travelers.
            </p>
            <ul className="mt-4 space-y-2 text-xs sm:text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-success shrink-0" aria-hidden="true" />
                <span>Zero listing fees; transparent commission upon confirmed booking</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-success shrink-0" aria-hidden="true" />
                <span>Digital voucher integration and direct coordinator line</span>
              </li>
            </ul>
          </div>

          {/* Audience Card 2: Travel Agents & Businesses */}
          <div
            onClick={() => {
              setPartnerType("agency");
              setFormData((prev) => ({ ...prev, role: "Travel Agency / B2B Advisor" }));
            }}
            className={`cursor-pointer rounded-3xl border p-6 transition-all duration-300 sm:p-8 ${
              partnerType === "agency"
                ? "border-accent bg-bg-card shadow-md"
                : "border-gray6 bg-white hover:border-gray4 shadow-xs"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-accent shadow-xs">
              <FiBriefcase className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="heading mt-4 text-xl font-bold text-dark sm:text-2xl">
              Travel agents & businesses
            </h3>
            <p className="body4 mt-2 text-text-secondary leading-relaxed">
              Inquire about bespoke client itineraries, custom private departures, and corporate offsite extensions. Access our curated operator network with dedicated coordinator support.
            </p>
            <ul className="mt-4 space-y-2 text-xs sm:text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-success shrink-0" aria-hidden="true" />
                <span>Dedicated B2B trip coordinator for custom group routing</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-success shrink-0" aria-hidden="true" />
                <span>Consolidated invoicing and itemized transparent pricing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Partner Application Form */}
        <div className="mt-10 rounded-3xl border border-gray6 bg-bg-card p-6 sm:p-10 lg:p-12">
          <div className="max-w-2xl">
            <span className="caption uppercase tracking-wider text-accent font-semibold">
              PARTNER APPLICATION
            </span>
            <h3 className="title1 mt-1 text-dark">
              {partnerType === "guide"
                ? "Apply as an operator or local host"
                : "Register for travel trade collaboration"}
            </h3>
            <p className="body4 mt-1 text-text-secondary">
              Tell us about your organization. Our regional partner team will review your credentials and reply within 2 business days.
            </p>
          </div>

          {submitted ? (
            <div className="my-8 max-w-lg rounded-2xl border border-success/30 bg-success/10 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-2xl text-success">
                <FiCheckCircle aria-hidden="true" />
              </div>
              <h4 className="title2 text-dark">Application submitted</h4>
              <p className="body3 mt-2 text-text-secondary">
                Thank you, {formData.name}! Our regional partner desk has received your details for {formData.destination}. We will reach out to {formData.email} within 2 business days.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-5"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    business: "",
                    role: partnerType === "guide" ? "Local Tour Operator" : "Travel Agency",
                    destination: "",
                    email: "",
                    phone: "",
                    message: "",
                    consent: true,
                  });
                }}
              >
                Submit another inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Contact name"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="min-h-[44px] text-base"
                />

                <Input
                  label="Business or trading name"
                  placeholder="E.g. Alpine Guiding Co."
                  value={formData.business}
                  onChange={(e) =>
                    setFormData({ ...formData, business: e.target.value })
                  }
                  className="min-h-[44px] text-base"
                />

                <Select
                  label="Partner category"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="min-h-[44px] text-base"
                >
                  <option value="Local Tour Operator">Local Tour Operator</option>
                  <option value="Licensed Native Guide">Licensed Native Guide</option>
                  <option value="Travel Agency / B2B Advisor">Travel Agency / B2B Advisor</option>
                  <option value="Corporate Event Organizer">Corporate Event Organizer</option>
                </Select>

                <Input
                  label="Destination or region of operation"
                  required
                  placeholder="E.g. Kyoto, French Riviera, Cappadocia"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="min-h-[44px] text-base"
                />

                <Input
                  label="Business email address"
                  type="email"
                  required
                  placeholder="contact@business.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="min-h-[44px] text-base"
                />

                <Input
                  label="Phone number (Optional)"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="min-h-[44px] text-base"
                />
              </div>

              <label className="block">
                <span className="title4 block mb-1 text-dark">
                  Brief description of your services or collaboration goals
                </span>
                <textarea
                  rows={3}
                  placeholder="Tell us about the routes you operate, safety certifications held, or client travel requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray5 p-3 text-base text-dark focus:border-accent focus:outline-none"
                />
              </label>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) =>
                      setFormData({ ...formData, consent: e.target.checked })
                    }
                    className="mt-1 h-5 w-5 rounded border-gray4 text-accent focus:ring-accent"
                  />
                  <span className="body5 text-text-secondary">
                    I confirm that our business operates in compliance with local commercial tourism regulations, and I consent to being contacted by Viatours Voyage regarding partner onboarding.
                  </span>
                </label>
              </div>

              {status.type === "error" && (
                <p className="caption text-error">{status.message}</p>
              )}

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  data-analytics-id="about-partner-submit"
                  className="hover:!bg-white hover:!text-accent"
                >
                  Submit partner application
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
