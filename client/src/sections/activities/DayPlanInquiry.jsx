"use client";

import { useState, useEffect } from "react";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import FormField from "@/components/ui/FormField";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import useDayPlanner from "@/hooks/useDayPlanner";
import { submitTripInquiry } from "@/services/leadService";
import { FiCheckCircle, FiClock, FiShield, FiSend, FiCalendar } from "react-icons/fi";

export default function DayPlanInquiry({ id = "day-plan-inquiry", type = "dayplan" }) {
  const { destination, selectedList, selectedCount, totalPrice } = useDayPlanner();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: destination || "Paris",
    travelDate: "Flexible",
    travelers: "2 travelers",
    notes: "",
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitResult, setSubmitResult] = useState(null);

  // Sync destination if day planner changed
  useEffect(() => {
    if (destination) {
      setFormData((prev) => ({ ...prev, destination }));
    }
  }, [destination]);

  // Pre-fill notes with shortlisted activities if empty
  useEffect(() => {
    if (selectedCount > 0) {
      setFormData((prev) => {
        if (prev.notes) return prev;
        const summary = selectedList.map((item) => `${item.slot}: ${item.title} ($${item.price})`).join("\n");
        return {
          ...prev,
          notes: `My shortlisted day plan in ${destination}:\n${summary}\nEstimated total: $${totalPrice.toFixed(2)}/person`,
        };
      });
    }
  }, [selectedCount, selectedList, destination, totalPrice]);

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
        type: selectedCount > 0 ? "dayplan" : type,
      });

      if (res.success) {
        setSubmitResult({ success: true, message: res.message });
      } else {
        setSubmitResult({ success: false, message: res.message || "Failed to submit inquiry." });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: "An unexpected network error occurred. Please try again.",
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
      destination: destination || "Paris",
      travelDate: "Flexible",
      travelers: "2 travelers",
      notes: "",
      consent: true,
    });
  };

  return (
    <Section bg="grey" spacing="md" id={id}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="DAY PLAN & BESPOKE ACTIVITIES"
          title="Send your day plan or request a custom itinerary"
          text="Whether you have shortlisted activities above or want our coordinators to design a private day from scratch, we'll verify guide availability and synchronize timing."
          align="center"
        />

        <div className="overflow-hidden rounded-2xl border border-gray6 bg-white shadow-xs">
          {submitResult?.success ? (
            <div className="p-8 text-center sm:p-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                <FiCheckCircle size={32} />
              </div>
              <h3 className="title2 mb-2 text-dark">Day plan inquiry received!</h3>
              <p className="body3 mx-auto mb-6 max-w-lg text-text-secondary">
                {submitResult.message}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="secondary" onClick={handleReset} data-analytics-id="dayplan-lead-reset">
                  Submit another request
                </Button>
                <Button href="#discover" variant="primary" data-analytics-id="dayplan-lead-explore">
                  Browse more activities
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

              {/* Shortlist Alert Notice if activities were picked */}
              {selectedCount > 0 && (
                <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-accent shrink-0" size={18} />
                    <p className="body4 text-dark font-medium">
                      Attached: {selectedCount} shortlisted moment{selectedCount > 1 ? "s" : ""} in {destination} (${totalPrice.toFixed(2)}/person)
                    </p>
                  </div>
                  <span className="caption text-accent font-semibold hidden sm:inline">Synchronized</span>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField label="Full Name" required error={errors.name}>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jordan Reed"
                    autoComplete="name"
                    required
                  />
                </FormField>

                <FormField label="Email Address" required error={errors.email}>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordan@example.com"
                    autoComplete="email"
                    required
                  />
                </FormField>

                <FormField label="Phone / WhatsApp" helperText="Optional, for quick host confirmations">
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                  />
                </FormField>

                <FormField label="Target Destination">
                  <Input
                    name="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Paris, Rome, Bali"
                  />
                </FormField>

                <FormField label="Travel Date / Month">
                  <Select
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  >
                    <option value="Flexible">I&apos;m flexible with dates</option>
                    <option value="Within 2 weeks">Within next 2 weeks</option>
                    <option value="This month">This month</option>
                    <option value="Next 1-3 months">Next 1 to 3 months</option>
                  </Select>
                </FormField>

                <FormField label="Party Size">
                  <Select
                    name="travelers"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  >
                    <option value="Solo (1 traveler)">Solo (1 traveler)</option>
                    <option value="Couple (2 travelers)">Couple (2 travelers)</option>
                    <option value="Family / Small group (3–5)">Small group (3–5 travelers)</option>
                    <option value="Group / Private buyout (6–12)">Private buyout (6–12 travelers)</option>
                  </Select>
                </FormField>

                <FormField
                  label="Day plan details & preferences"
                  helperText="List specific timing requirements, dietary needs, or pace preferences."
                  className="sm:col-span-2"
                >
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    placeholder="e.g. We want a relaxed morning food walk followed by an afternoon sea cave paddle. Vegetarian options needed."
                  />
                </FormField>

                <div className="sm:col-span-2">
                  <Checkbox
                    id="dayplan-consent"
                    label="I agree to receive a tailored day schedule and activity availability confirmation from Viatours via email."
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    error={errors.consent}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray6 pt-6 sm:flex-row">
                <div className="flex items-center gap-2 caption text-text-secondary">
                  <FiShield className="text-accent" aria-hidden="true" />
                  <span>Free consultation. Direct local coordinator turnaround within 24h.</span>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  rightIcon={<FiSend aria-hidden="true" />}
                  data-analytics-id="dayplan-form-submit"
                  className="w-full sm:w-auto"
                >
                  Submit day plan inquiry
                </Button>
              </div>
            </form>
          )}

          {/* Reassurance footer strip */}
          <div className="grid grid-cols-1 divide-y divide-gray6 border-t border-gray6 bg-gray7/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex items-center gap-2.5 p-4 body5 text-text-secondary">
              <FiClock className="shrink-0 text-accent" aria-hidden="true" />
              <span>24h coordinator response</span>
            </div>
            <div className="flex items-center gap-2.5 p-4 body5 text-text-secondary">
              <FiCalendar className="shrink-0 text-accent" aria-hidden="true" />
              <span>Synchronized activity pacing</span>
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
