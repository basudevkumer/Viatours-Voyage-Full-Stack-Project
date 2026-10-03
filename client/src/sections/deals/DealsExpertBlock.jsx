"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { submitTripInquiry } from "@/services/leadService";
import { FiPhone, FiMail, FiCheckCircle, FiClock, FiMapPin, FiHeadphones } from "react-icons/fi";

export default function DealsExpertBlock() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your name and email so our specialist can reach you.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await submitTripInquiry({
        type: "call",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        destination: formData.destination.trim(),
        notes: formData.notes.trim(),
      });

      if (res.success) {
        setSubmitted(true);
        setStatus({ type: "success", message: res.message });
      } else {
        setStatus({
          type: "error",
          message: res.message || "Could not submit your request. Please try again.",
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
    <section className="bg-white py-12 sm:py-16 lg:py-20" id="talk-to-expert">
      <Container>
        <div className="grid gap-10 rounded-3xl border border-gray6 bg-bg-card p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:p-14">
          {/* Left Column: Factual Contact Information */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="caption uppercase tracking-wider text-accent font-semibold">
                LOCAL TRAVEL ADVISORS
              </span>
              <h2 className="heading mt-2 text-2xl font-bold text-dark sm:text-3xl lg:text-4xl">
                Need advice matching dates or itineraries?
              </h2>
              <p className="body2 mt-3 text-text-secondary">
                Our destination desks have direct line communication with regional tour leaders. If you are comparing shoulder departures or have specific timing constraints, our team will provide candid advice on seasonal conditions.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-accent shadow-xs">
                    <FiPhone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="caption block text-text-secondary">Toll-free customer desk</span>
                    <a
                      href="tel:+18004536744"
                      className="title3 text-dark hover:text-accent transition-colors"
                    >
                      1-800-453-6744
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-accent shadow-xs">
                    <FiMail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="caption block text-text-secondary">Email support</span>
                    <a
                      href="mailto:hi@viatours.com"
                      className="title3 text-dark hover:text-accent transition-colors"
                    >
                      hi@viatours.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-accent shadow-xs">
                    <FiClock className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="caption block text-text-secondary">Support availability</span>
                    <span className="body4 font-medium text-dark">
                      24 hours a day, 7 days a week
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray6 pt-6">
              <p className="caption text-text-secondary">
                Main office: 328 Queensberry Street, North Melbourne VIC 3051, Australia.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Form (type="call") */}
          <div className="rounded-2xl border border-gray6 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="title1 text-dark">Get a free suggestion</h3>
            <p className="body4 mt-1 text-text-secondary">
              Tell us where you are looking to travel, and our specialist will confirm availability and honest advice.
            </p>

            {submitted ? (
              <div className="my-8 rounded-xl bg-success/10 p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-2xl text-success">
                  <FiCheckCircle aria-hidden="true" />
                </div>
                <h4 className="title2 text-dark">Consultation requested</h4>
                <p className="body3 mt-2 text-text-secondary">
                  Thank you, {formData.name}! Our destination specialist will review seasonal operator rates and email a suggestion to {formData.email}.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-5"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      destination: "",
                      notes: "",
                    });
                  }}
                >
                  Request another suggestion
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <Input
                  label="Your name"
                  required
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="min-h-[44px] text-base"
                />

                <Input
                  label="Email address"
                  type="email"
                  required
                  placeholder="traveler@example.com"
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

                <Input
                  label="Destination of interest"
                  placeholder="E.g. Bangkok & Phuket, Rome & Amalfi"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="min-h-[44px] text-base"
                />

                <label className="block">
                  <span className="title4 block mb-1 text-dark">
                    Timing or question
                  </span>
                  <textarea
                    rows={2}
                    placeholder="When do you hope to travel? Any particular activities you want to include?"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray5 p-3 text-base text-dark focus:border-accent focus:outline-none"
                  />
                </label>

                {status.type === "error" && (
                  <p className="caption text-error">{status.message}</p>
                )}

                <Button
                  type="submit"
                  size="md"
                  fullWidth
                  loading={loading}
                  data-analytics-id="call-request-submit"
                  className="mt-2"
                >
                  Get a free suggestion
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
