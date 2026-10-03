"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";
import FormField from "@/components/ui/FormField";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { submitTripInquiry } from "@/services/leadService";
import { FiCheckCircle, FiUsers, FiDollarSign, FiCalendar, FiSend } from "react-icons/fi";

export default function ExperiencePartnerBlock() {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    destination: "",
    category: "Culinary & Food Walks",
    email: "",
    phone: "",
    consent: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please enter a valid business email.";
    }
    if (!formData.destination.trim()) {
      errs.destination = "Please specify the city or region you operate in.";
    }
    if (!formData.consent) {
      errs.consent = "You must agree to our host onboarding terms.";
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
        type: "partner",
        notes: `Host application for ${formData.business || formData.name} in ${formData.destination} (${formData.category}).`,
      });

      if (res.success) {
        setResult({ success: true, message: res.message });
      } else {
        setResult({ success: false, message: res.message || "Could not submit application." });
      }
    } catch {
      setResult({
        success: false,
        message: "An unexpected error occurred. Please email hosts@viatours.com directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray7/50 py-14 sm:py-20 border-t border-gray6" id="host-an-experience">
      <Container>
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray6 bg-white p-6 sm:p-10 shadow-xs">
          <div className="mb-8">
            <span className="caption mb-2 inline-block font-semibold uppercase tracking-wider text-accent">
              SUPPLY-SIDE PARTNERSHIP
            </span>
            <h2 className="title1 mb-3 text-dark">
              Are you a licensed guide, artisan, or excursion host?
            </h2>
            <p className="body3 text-text-secondary max-w-2xl">
              List your unique half-day tours, culinary walks, or workshops on Viatours Voyage. Reach intentional travelers seeking authentic local immersion.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid gap-5 sm:grid-cols-3 mb-8">
            <div className="rounded-xl border border-gray6 bg-gray7/30 p-4">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FiDollarSign size={18} aria-hidden="true" />
              </div>
              <h3 className="title4 font-bold text-dark mb-1">Fair & Transparent</h3>
              <p className="caption text-text-secondary">
                Direct payouts with no hidden listing fees. You set your own rates and group caps.
              </p>
            </div>

            <div className="rounded-xl border border-gray6 bg-gray7/30 p-4">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FiUsers size={18} aria-hidden="true" />
              </div>
              <h3 className="title4 font-bold text-dark mb-1">Qualified Travelers</h3>
              <p className="caption text-text-secondary">
                Connect with travelers booking curated itineraries who value small-group authenticity.
              </p>
            </div>

            <div className="rounded-xl border border-gray6 bg-gray7/30 p-4">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FiCalendar size={18} aria-hidden="true" />
              </div>
              <h3 className="title4 font-bold text-dark mb-1">Schedule Control</h3>
              <p className="caption text-text-secondary">
                Maintain complete control of your availability, blackout dates, and language offerings.
              </p>
            </div>
          </div>

          {!openForm ? (
            <div className="flex flex-col items-start justify-between gap-4 border-t border-gray6 pt-6 sm:flex-row sm:items-center">
              <div>
                <p className="body4 font-semibold text-dark">Ready to share your local craft or knowledge?</p>
                <p className="caption text-text-secondary">Host applications are reviewed within 48 hours.</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setOpenForm(true)}
                data-analytics-id="partner-apply-open"
              >
                Become a partner
              </Button>
            </div>
          ) : result?.success ? (
            <div className="rounded-xl border border-success/20 bg-success/10 p-6 text-center">
              <FiCheckCircle className="mx-auto text-success mb-2" size={28} />
              <h3 className="title3 text-dark font-bold mb-1">Application Submitted</h3>
              <p className="body4 text-text-secondary max-w-md mx-auto">{result.message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="border-t border-gray6 pt-6 space-y-4">
              <h3 className="title3 text-dark font-bold mb-2">Host Application Form</h3>

              {result?.success === false && (
                <p className="caption text-error rounded-lg bg-error/10 p-2.5">{result.message}</p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Full Name" required error={errors.name}>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marco Rossi"
                    required
                  />
                </FormField>

                <FormField label="Business / Operating Name">
                  <Input
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    placeholder="e.g. Rome Historic Walks"
                  />
                </FormField>

                <FormField label="Destination / City" required error={errors.destination}>
                  <Input
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Rome, Italy"
                    required
                  />
                </FormField>

                <FormField label="Experience Category">
                  <Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Culinary & Food Walks">Culinary & Food Walks</option>
                    <option value="Historic & Walking Tours">Historic & Walking Tours</option>
                    <option value="Water & Boating Excursions">Water & Boating Excursions</option>
                    <option value="Adventure & Nature">Adventure & Nature</option>
                    <option value="Artisan Workshops & Crafts">Artisan Workshops & Crafts</option>
                  </Select>
                </FormField>

                <FormField label="Business Email" required error={errors.email}>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marco@example.com"
                    required
                  />
                </FormField>

                <FormField label="Contact Phone">
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+39 06 1234567"
                  />
                </FormField>
              </div>

              <div className="pt-2">
                <Checkbox
                  id="partner-consent"
                  label="I confirm I am a certified guide, registered operator, or independent artisan with proper local permits."
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  error={errors.consent}
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={loading}
                  rightIcon={<FiSend aria-hidden="true" />}
                  data-analytics-id="partner-form-submit"
                >
                  Submit application
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
