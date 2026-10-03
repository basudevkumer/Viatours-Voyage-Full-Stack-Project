"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";
import FormField from "@/components/ui/FormField";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { submitTripInquiry } from "@/services/leadService";
import { FiEdit3, FiCheckCircle, FiSend } from "react-icons/fi";

export default function GuideContributorBlock() {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
    topic: "",
    previousWork: "",
    consent: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.destination.trim()) {
      errs.destination = "Please specify the destination or region you write about.";
    }
    if (!formData.topic.trim()) {
      errs.topic = "Please outline your guide pitch or topic.";
    }
    if (!formData.consent) {
      errs.consent = "You must agree to our editorial guidelines.";
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
        name: formData.name,
        email: formData.email,
        destination: formData.destination,
        notes: `Contributor proposal: ${formData.topic}. Portfolio: ${formData.previousWork || "None provided"}`,
        type: "contributor",
      });

      if (res.success) {
        setResult({ success: true, message: res.message });
      } else {
        setResult({ success: false, message: res.message || "Failed to submit proposal." });
      }
    } catch {
      setResult({
        success: false,
        message: "An unexpected error occurred. Please email editorial@viatours.com directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray7/30 py-14 sm:py-20 border-t border-gray6" id="contribute-a-guide">
      <Container>
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray6 bg-white p-6 sm:p-10 shadow-xs">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FiEdit3 size={24} aria-hidden="true" />
            </div>
            <div>
              <span className="caption mb-1 inline-block font-semibold uppercase tracking-wider text-accent">
                CONTRIBUTOR NETWORK
              </span>
              <h2 className="title1 mb-2 text-dark">
                Local expert or travel writer? Share your knowledge
              </h2>
              <p className="body3 text-text-secondary">
                We compensate local cultural historians, accredited tour leaders, and travel journalists for high-accuracy neighborhood guides and field notes.
              </p>
            </div>
          </div>

          {!openForm ? (
            <div className="flex flex-col items-start justify-between gap-4 border-t border-gray6 pt-6 sm:flex-row sm:items-center">
              <div>
                <p className="body4 font-semibold text-dark">Have an insider perspective on a destination?</p>
                <p className="caption text-text-secondary">Editorial pitches are reviewed within 3 business days.</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setOpenForm(true)}
                data-analytics-id="contributor-apply-open"
              >
                Pitch a guide
              </Button>
            </div>
          ) : result?.success ? (
            <div className="rounded-xl border border-success/20 bg-success/10 p-6 text-center">
              <FiCheckCircle className="mx-auto text-success mb-2" size={28} />
              <h3 className="title3 text-dark font-bold mb-1">Proposal Submitted</h3>
              <p className="body4 text-text-secondary max-w-md mx-auto">{result.message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="border-t border-gray6 pt-6 space-y-4">
              <h3 className="title3 text-dark font-bold mb-2">Writer & Guide Proposal</h3>

              {result?.success === false && (
                <p className="caption text-error rounded-lg bg-error/10 p-2.5">{result.message}</p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Full Name" required error={errors.name}>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    required
                  />
                </FormField>

                <FormField label="Email Address" required error={errors.email}>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@example.com"
                    required
                  />
                </FormField>

                <FormField label="Destination Focus" required error={errors.destination}>
                  <Input
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Kyoto, Japan or Amalfi Coast"
                    required
                  />
                </FormField>

                <FormField label="Portfolio or Bio Link">
                  <Input
                    type="url"
                    value={formData.previousWork}
                    onChange={(e) => setFormData({ ...formData, previousWork: e.target.value })}
                    placeholder="https://yourportfolio.com or article link"
                  />
                </FormField>

                <FormField
                  label="Proposed Guide Pitch"
                  required
                  error={errors.topic}
                  className="sm:col-span-2"
                  helperText="Briefly describe the route, cultural angle, or practical angle of your guide."
                >
                  <Textarea
                    rows={3}
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g. A walking guide to the traditional textile and dye workshops of Kyoto's Nishijin district."
                    required
                  />
                </FormField>
              </div>

              <div className="pt-2">
                <Checkbox
                  id="contributor-consent"
                  label="I verify that all submitted travel details are based on firsthand research and adhere to non-promotional editorial standards."
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
                  data-analytics-id="contributor-form-submit"
                >
                  Submit pitch
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
