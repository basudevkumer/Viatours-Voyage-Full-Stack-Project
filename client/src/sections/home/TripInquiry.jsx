"use client";

import { useState } from "react";
import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { submitTripInquiry } from "@/services/leadService";
import { FiCheckCircle, FiSend, FiShield } from "react-icons/fi";

const destinationOptions = [
  "Bali, Indonesia",
  "Dolomites, Italy",
  "Santorini, Greece",
  "Cappadocia, Turkey",
  "Paris, France",
  "Phuket, Thailand",
  "Kyoto, Japan",
  "Maldives",
  "Multiple / Still deciding",
];

const timelineOptions = [
  "Within the next month",
  "In 2 to 3 months",
  "In 3 to 6 months",
  "6+ months away",
  "Flexible / Exploring ideas",
];

export default function TripInquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: destinationOptions[0],
    timeline: timelineOptions[0],
    travelers: "2 travelers",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ submitted: false, success: false, message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus({ submitted: false, success: false, message: "" });

    try {
      const response = await submitTripInquiry(formData);
      if (response.success) {
        setStatus({
          submitted: true,
          success: true,
          message: response.message || "Your inquiry has been received! Our travel specialist will reach out within 24 hours.",
        });
      } else {
        setStatus({
          submitted: true,
          success: false,
          message: response.message || "We could not process your inquiry. Please try again.",
        });
      }
    } catch {
      setStatus({
        submitted: true,
        success: false,
        message: "An unexpected error occurred. Please reach out to hi@viatours.com directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section bg="cream" spacing="lg" id="plan-my-trip">
      <div className="mx-auto max-w-[840px]">
        <SectionHeading
          eyebrow="BESPOKE TRAVEL PLANNING"
          title="Not ready to book? Let us build it with you."
          text="Tell us what you have in mind. A dedicated itinerary curator will assemble options matching your dates, pace, and interests."
          align="center"
        />

        <div className="mt-8 rounded-3xl border border-gray6 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          {status.submitted && status.success ? (
            <div className="py-8 text-center" role="status" aria-live="polite">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bg-success text-success">
                <FiCheckCircle size={32} />
              </div>
              <h3 className="heading !text-2xl text-dark">Inquiry received</h3>
              <p className="body3 mt-2 text-text-secondary max-w-md mx-auto">
                {status.message}
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setStatus({ submitted: false, success: false, message: "" });
                    setFormData({
                      name: "",
                      email: "",
                      destination: destinationOptions[0],
                      timeline: timelineOptions[0],
                      travelers: "2 travelers",
                      note: "",
                    });
                  }}
                >
                  Submit another inquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="e.g. Sarah Jenkins"
                required
                error={errors.name}
                wrapperClassName="sm:col-span-1"
              />

              <Input
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="sarah@example.com"
                required
                error={errors.email}
                wrapperClassName="sm:col-span-1"
              />

              <Select
                label="Preferred destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange("destination")}
                wrapperClassName="sm:col-span-1"
              >
                {destinationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>

              <Select
                label="Approximate travel window"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange("timeline")}
                wrapperClassName="sm:col-span-1"
              >
                {timelineOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>

              <Select
                label="Party size"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange("travelers")}
                wrapperClassName="sm:col-span-2"
              >
                <option value="1 solo traveler">1 solo traveler</option>
                <option value="2 travelers">2 travelers (couple / companions)</option>
                <option value="3-5 travelers (family/friends)">3–5 travelers (small family/friends)</option>
                <option value="6-10 travelers (group)">6–10 travelers (group)</option>
                <option value="10+ travelers (large private group)">10+ travelers (large private / corporate)</option>
              </Select>

              <div className="sm:col-span-2">
                <Textarea
                  label="Special interests or requests (optional)"
                  name="note"
                  value={formData.note}
                  onChange={handleChange("note")}
                  placeholder="e.g. Celebrating an anniversary, prefer boutique eco-lodges, need vegetarian food options..."
                  rows={3}
                />
              </div>

              {status.submitted && !status.success && (
                <div role="alert" className="sm:col-span-2 rounded-xl bg-error/10 p-3 text-error body5">
                  {status.message}
                </div>
              )}

              <div className="sm:col-span-2 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  fullWidth
                  data-analytics-id="lead-inquiry-submit"
                  rightIcon={<FiSend aria-hidden="true" />}
                >
                  Request custom travel proposal
                </Button>

                <p className="body5 mt-3 flex items-center justify-center gap-1.5 text-text-secondary text-center">
                  <FiShield aria-hidden="true" className="text-accent" />
                  Your information is secure. We never sell your details or send unsolicited promotions.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
