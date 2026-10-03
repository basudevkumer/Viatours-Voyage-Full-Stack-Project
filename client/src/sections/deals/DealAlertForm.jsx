"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Chip from "@/components/ui/Chip";
import { submitTripInquiry } from "@/services/leadService";
import { FiBell, FiCheckCircle, FiShield, FiMail, FiMapPin, FiCalendar } from "react-icons/fi";

const interestOptions = [
  "Adventure",
  "Sightseeing",
  "Cultural & Heritage",
  "Culinary & Wine",
  "Nature & Wildlife",
  "Water & Sailing",
];

const destinationList = [
  "Any destination",
  "Bangkok, Thailand",
  "Tokyo, Japan",
  "Dubai, UAE",
  "Bali, Indonesia",
  "Rome, Italy",
  "Paris, France",
  "Santorini, Greece",
  "Istanbul, Turkey",
  "Phuket, Thailand",
];

export default function DealAlertForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "Any destination",
    travelMonth: "Flexible / Any month",
    budgetRange: "Flexible budget",
    interests: ["Adventure", "Cultural & Heritage"],
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submittedData, setSubmittedData] = useState(null);

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setStatus({
        type: "error",
        message: "Please enter your email address to receive deal alerts.",
      });
      return;
    }

    if (!formData.consent) {
      setStatus({
        type: "error",
        message: "Please check the consent box to confirm you wish to receive deal alerts.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await submitTripInquiry({
        type: "deal-alert",
        name: formData.name.trim() || "Traveler",
        email: formData.email.trim(),
        destination: formData.destination,
        travelMonth: formData.travelMonth,
        budgetRange: formData.budgetRange,
        interests: formData.interests,
      });

      if (res.success) {
        setStatus({ type: "success", message: res.message });
        setSubmittedData({ ...formData });
      } else {
        setStatus({
          type: "error",
          message: res.message || "Failed to subscribe. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStatus({ type: "idle", message: "" });
    setSubmittedData(null);
    setFormData({
      name: "",
      email: "",
      destination: "Any destination",
      travelMonth: "Flexible / Any month",
      budgetRange: "Flexible budget",
      interests: ["Adventure", "Cultural & Heritage"],
      consent: false,
    });
  };

  return (
    <section className="bg-dark py-14 text-white sm:py-20 lg:py-24" id="deal-alerts">
      <Container>
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="CLIENT HUNTING & EARLY ACCESS"
            title="Never miss a verified travel rate reduction"
            text="Set your preferred destinations and travel window. We will email you the moment audited seasonal specials or operator shoulder allocations open — with zero spam and zero fabricated countdowns."
            tone="light"
            align="center"
          />

          {status.type === "success" && submittedData ? (
            /* Success confirmation panel */
            <div className="rounded-3xl border border-white/20 bg-white/5 p-8 text-center backdrop-blur-md sm:p-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-3xl text-success">
                <FiCheckCircle aria-hidden="true" />
              </div>

              <h3 className="heading text-2xl text-white sm:text-3xl">
                Deal Alert Activated
              </h3>

              <p className="body2 mx-auto mt-3 max-w-xl text-white/80">
                You are now subscribed for verified rate alerts at{" "}
                <span className="font-semibold text-white">{submittedData.email}</span>.
              </p>

              <div className="mx-auto mt-6 max-w-md rounded-2xl border border-white/10 bg-white/10 p-5 text-left text-sm text-white/90">
                <p className="font-semibold text-white">Your alert preferences:</p>
                <ul className="mt-2 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <span className="text-white/60">Destination:</span>{" "}
                    {submittedData.destination}
                  </li>
                  <li>
                    <span className="text-white/60">Travel window:</span>{" "}
                    {submittedData.travelMonth}
                  </li>
                  <li>
                    <span className="text-white/60">Budget target:</span>{" "}
                    {submittedData.budgetRange}
                  </li>
                  <li>
                    <span className="text-white/60">Interests:</span>{" "}
                    {submittedData.interests.join(", ")}
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  data-analytics-id="deal-alert-reset"
                  className="border-white/30 text-white hover:border-white hover:bg-white hover:text-dark"
                >
                  Configure another alert
                </Button>
              </div>
            </div>
          ) : (
            /* Subscription Form */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Email (Required) */}
                <div className="sm:col-span-1">
                  <Input
                    label="Email address (Required)"
                    type="email"
                    name="email"
                    required
                    placeholder="traveler@example.com"
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    leftIcon={<FiMail aria-hidden="true" />}
                    className="!bg-white/10 !text-white !border-white/20 placeholder:text-white/40 focus:!border-accent text-base min-h-[48px]"
                    labelClassName="!text-white font-medium"
                  />
                </div>

                {/* Name (Optional) */}
                <div className="sm:col-span-1">
                  <Input
                    label="First name (Optional)"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="!bg-white/10 !text-white !border-white/20 placeholder:text-white/40 focus:!border-accent text-base min-h-[48px]"
                    labelClassName="!text-white font-medium"
                  />
                </div>

                {/* Preferred Destination */}
                <div className="sm:col-span-1">
                  <Select
                    label="Preferred destination"
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                    className="!bg-dark !text-white !border-white/20 text-base min-h-[48px]"
                    labelClassName="!text-white font-medium"
                  >
                    {destinationList.map((dest) => (
                      <option key={dest} value={dest} className="bg-dark text-white">
                        {dest}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Travel Month */}
                <div className="sm:col-span-1">
                  <Select
                    label="Target travel month"
                    value={formData.travelMonth}
                    onChange={(e) =>
                      setFormData({ ...formData, travelMonth: e.target.value })
                    }
                    className="!bg-dark !text-white !border-white/20 text-base min-h-[48px]"
                    labelClassName="!text-white font-medium"
                  >
                    <option value="Flexible / Any month" className="bg-dark text-white">
                      Flexible / Any month
                    </option>
                    <option value="October 2026" className="bg-dark text-white">
                      October 2026
                    </option>
                    <option value="November 2026" className="bg-dark text-white">
                      November 2026
                    </option>
                    <option value="December 2026" className="bg-dark text-white">
                      December 2026
                    </option>
                    <option value="Spring 2027" className="bg-dark text-white">
                      Spring 2027
                    </option>
                  </Select>
                </div>

                {/* Budget Range */}
                <div className="sm:col-span-2">
                  <Select
                    label="Target budget per person"
                    value={formData.budgetRange}
                    onChange={(e) =>
                      setFormData({ ...formData, budgetRange: e.target.value })
                    }
                    className="!bg-dark !text-white !border-white/20 text-base min-h-[48px]"
                    labelClassName="!text-white font-medium"
                  >
                    <option value="Flexible budget" className="bg-dark text-white">
                      Flexible budget
                    </option>
                    <option value="Under $100 (Day experiences)" className="bg-dark text-white">
                      Under $100 (Day experiences)
                    </option>
                    <option value="$100 - $250 (Mid-range)" className="bg-dark text-white">
                      $100 - $250 (Mid-range)
                    </option>
                    <option value="$250 - $500 (Multi-day tours)" className="bg-dark text-white">
                      $250 - $500 (Multi-day tours)
                    </option>
                    <option value="$500+ (Premium itineraries)" className="bg-dark text-white">
                      $500+ (Premium itineraries)
                    </option>
                  </Select>
                </div>

                {/* Travel Interests (Chips) */}
                <div className="sm:col-span-2">
                  <span className="title4 block !text-white mb-2 font-medium">
                    Travel styles of interest:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((opt) => {
                      const selected = formData.interests.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleInterest(opt)}
                          className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                            selected
                              ? "bg-accent text-white shadow-xs"
                              : "border border-white/20 bg-white/10 text-white/80 hover:bg-white/20"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) =>
                        setFormData({ ...formData, consent: e.target.checked })
                      }
                      className="mt-1 h-5 w-5 rounded border-white/30 text-accent focus:ring-accent"
                    />
                    <span className="body5 text-white/80">
                      I agree to receive verified travel deal alerts and seasonal promotional notices. I understand I can unsubscribe anytime with a single click.
                    </span>
                  </label>
                </div>
              </div>

              {/* Error Status */}
              {status.type === "error" && (
                <div className="mt-5 rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-200">
                  {status.message}
                </div>
              )}

              {/* Submit CTA */}
              <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
                <p className="caption flex items-center gap-1.5 text-white/60">
                  <FiShield className="text-accent" aria-hidden="true" />
                  Your information is never sold. Strictly zero spam.
                </p>

                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  data-analytics-id="deal-alert-submit"
                  className="w-full hover:!bg-white hover:!text-accent sm:w-auto"
                >
                  Activate deal alerts
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
