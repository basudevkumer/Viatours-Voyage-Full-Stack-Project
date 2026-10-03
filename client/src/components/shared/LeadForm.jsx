"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiCheckCircle, FiAlertCircle, FiSend, FiX, FiShield, FiArrowRight } from "react-icons/fi";
import FormField from "@/components/ui/FormField";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { submitLead } from "@/services/leadService";
import { destinationsData } from "@/sections/destinations/data";
import { SITE_CONFIG } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function LeadForm({
  type = "trip",
  source = "contact-page",
  prefillItem = "",
  prefillDestination = "",
  utmParams = {},
  onSuccess,
  className,
}) {
  // Timestamp recorded on mount for minimum-time bot check
  const renderTimeRef = useRef(Date.now());
  const formRef = useRef(null);

  // Active asking-about chip
  const [askingAboutItem, setAskingAboutItem] = useState(prefillItem);

  // Common and intent-specific form fields (persisted across intent changes)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: prefillDestination || "",
    travelMonth: "Flexible",
    travelers: "2 travelers",
    budgetRange: "Flexible",
    groupType: "Family gathering",
    groupSize: "8–15 travelers",
    bookingReference: "",
    topic: "General inquiry",
    businessName: "",
    role: "Local Guide / Expert",
    timeWindow: "Morning (09:00 – 12:00)",
    message: "",
    consent: true,
    company_hp: "", // Honeypot field (hidden from humans)
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Update destination if prefillDestination changes
  useEffect(() => {
    if (prefillDestination) {
      setFormData((prev) => ({ ...prev, destination: prefillDestination }));
    }
  }, [prefillDestination]);

  useEffect(() => {
    if (prefillItem) {
      setAskingAboutItem(prefillItem);
    }
  }, [prefillItem]);

  const updateField = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (type === "call") {
      if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
      if (!formData.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    } else if (type === "deal-alert") {
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        nextErrors.email = "Please enter a valid email address.";
      }
    } else {
      if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        nextErrors.email = "Please enter a valid email address.";
      }

      if (type === "partner") {
        if (!formData.businessName.trim()) nextErrors.businessName = "Please enter your business or operator name.";
        if (!formData.destination.trim()) nextErrors.destination = "Please specify your operating region or destination.";
      }
    }

    if (!formData.consent) {
      nextErrors.consent = "Please agree to our communication policy.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first invalid field
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
      if (el) el.focus();
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const payload = {
        ...formData,
        type,
        source,
        item: askingAboutItem || undefined,
        renderTime: renderTimeRef.current,
        timestamp: new Date().toISOString(),
        ...utmParams,
      };

      const result = await submitLead(payload);

      if (result.success) {
        setSubmitResult({
          success: true,
          message: result.message,
          data: result.data,
        });
        onSuccess?.(result.data);
      } else {
        // Map field errors if returned as an array
        if (Array.isArray(result.errors)) {
          const mapped = {};
          result.errors.forEach((err) => {
            if (err.field) mapped[err.field] = err.message;
          });
          setErrors(mapped);
        }
        setSubmitResult({
          success: false,
          message: result.message || "Failed to submit. Please verify details.",
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: "An unexpected network error occurred. Please try again or email us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitResult(null);
    setErrors({});
    setFormData((prev) => ({
      ...prev,
      bookingReference: "",
      message: "",
      company_hp: "",
    }));
    renderTimeRef.current = Date.now();
  };

  // Button CTA labels per intent
  const getSubmitLabel = () => {
    switch (type) {
      case "group":
        return "Request custom group quote";
      case "booking-support":
        return "Submit booking inquiry";
      case "question":
        return "Send inquiry";
      case "partner":
        return "Submit partner application";
      case "call":
        return "Confirm consultation slot";
      case "deal-alert":
        return "Subscribe to deal alerts";
      default:
        return "Send trip planning request";
    }
  };

  // --- Success State ---
  if (submitResult?.success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "rounded-2xl border border-gray6 bg-white p-6 text-center sm:p-10 shadow-xs",
          className
        )}
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <FiCheckCircle size={36} aria-hidden="true" />
        </div>

        <h3 className="title2 text-dark">Inquiry received</h3>
        <p className="body3 mx-auto mt-2 max-w-lg text-text-secondary leading-relaxed">
          {submitResult.message}
        </p>

        {/* Submission Summary */}
        <div className="mx-auto mt-6 max-w-md rounded-xl border border-gray6 bg-bg-field p-4 text-left body5 text-text-secondary">
          <div className="font-semibold text-dark mb-1">Submission summary:</div>
          <div><strong className="text-dark">Type:</strong> {type.replace("-", " ")}</div>
          <div><strong className="text-dark">Contact:</strong> {formData.name} ({formData.email || formData.phone})</div>
          {formData.destination && (
            <div><strong className="text-dark">Destination:</strong> {formData.destination}</div>
          )}
          {formData.bookingReference && (
            <div><strong className="text-dark">Booking ref:</strong> {formData.bookingReference}</div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            data-analytics-id="contact-form-reset"
          >
            Submit another message
          </Button>
          <Button
            href="/tours"
            variant="primary"
            data-analytics-id="contact-success-explore-tours"
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            Browse tours
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="lead-form-panel"
      role="tabpanel"
      aria-labelledby={`intent-tab-${type}`}
      className={cn("rounded-2xl border border-gray6 bg-white p-6 sm:p-8 md:p-10 shadow-xs", className)}
    >
      {/* Asking About Chip (If prefilled from another page/item) */}
      {askingAboutItem && (
        <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-accent/20 bg-accent/5 px-4 py-2.5">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-dark">
            <span className="text-accent font-semibold">Prefilled context:</span>
            <span className="truncate">{askingAboutItem}</span>
          </div>
          <button
            type="button"
            onClick={() => setAskingAboutItem("")}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-white hover:text-dark transition-colors"
            aria-label="Remove prefilled item context"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Server Error Alert */}
      {submitResult?.success === false && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-error/20 bg-error/10 p-4 text-error body4"
        >
          <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">{submitResult.message}</p>
            <p className="mt-1 text-xs opacity-90">
              Need immediate help? Email us directly at{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="underline font-semibold">
                {SITE_CONFIG.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${SITE_CONFIG.phoneTel}`} className="underline font-semibold">
                {SITE_CONFIG.phoneDisplay}
              </a>.
            </p>
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Hidden Honeypot Field (Bot trap) */}
        <div
          aria-hidden="true"
          style={{ opacity: 0, position: "absolute", zIndex: -10, height: 0, width: 0, pointerEvents: "none" }}
        >
          <label htmlFor="company_hp">Do not fill this field</label>
          <input
            id="company_hp"
            name="company_hp"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company_hp}
            onChange={updateField("company_hp")}
          />
        </div>

        {/* --- DYNAMIC FORM FIELDS BY INTENT TYPE --- */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* INTENT: TRIP PLANNING */}
          {type === "trip" && (
            <>
              <FormField label="Full Name" required error={errors.name}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={updateField("name")}
                  placeholder="e.g. Alex Morgan"
                  autoComplete="name"
                  required
                />
              </FormField>

              <FormField label="Email Address" required error={errors.email}>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  placeholder="alex@example.com"
                  autoComplete="email"
                  required
                />
              </FormField>

              <FormField label="Phone Number" helperText="Optional, for travel updates">
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={updateField("phone")}
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                />
              </FormField>

              <FormField label="Destination of Interest">
                <Select
                  name="destination"
                  value={formData.destination}
                  onChange={updateField("destination")}
                >
                  <option value="">Flexible / Exploring ideas</option>
                  {destinationsData.map((d) => (
                    <option key={d.slug} value={d.name}>
                      {d.name}, {d.country}
                    </option>
                  ))}
                  <option value="Multiple Destinations">Multiple destinations / Grand tour</option>
                </Select>
              </FormField>

              <FormField label="Approximate Timing">
                <Select
                  name="travelMonth"
                  value={formData.travelMonth}
                  onChange={updateField("travelMonth")}
                >
                  <option value="Flexible">I&apos;m flexible with dates</option>
                  <option value="Within 1 month">Within the next 30 days</option>
                  <option value="1–3 months">1 to 3 months away</option>
                  <option value="3–6 months">3 to 6 months away</option>
                  <option value="6+ months">More than 6 months away</option>
                </Select>
              </FormField>

              <FormField label="Number of Travelers">
                <Select
                  name="travelers"
                  value={formData.travelers}
                  onChange={updateField("travelers")}
                >
                  <option value="Solo (1 traveler)">Solo (1 traveler)</option>
                  <option value="2 travelers">Couple / 2 travelers</option>
                  <option value="3–5 travelers">Small group (3–5 travelers)</option>
                  <option value="6–12 travelers">Family / Group (6–12 travelers)</option>
                  <option value="13+ travelers">Large party (13+ travelers)</option>
                </Select>
              </FormField>

              <FormField label="Estimated Budget Range" className="sm:col-span-2">
                <Select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={updateField("budgetRange")}
                >
                  <option value="Flexible">Flexible / Open to guidance</option>
                  <option value="Under $1,500 pp">Under $1,500 per person</option>
                  <option value="$1,500–$3,000 pp">$1,500–$3,000 per person</option>
                  <option value="$3,000–$6,000 pp">$3,000–$6,000 per person</option>
                  <option value="$6,000+ pp">$6,000+ per person (Bespoke luxury)</option>
                </Select>
              </FormField>

              <FormField
                label="Trip Vision & Interests"
                helperText="Pacing, dietary needs, boutique preferences, must-see sights."
                className="sm:col-span-2"
              >
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={updateField("message")}
                  rows={4}
                  placeholder="e.g. Planning a 10th anniversary trip. We love wine tastings, light morning walks, and historic stays."
                />
              </FormField>
            </>
          )}

          {/* INTENT: GROUP & CORPORATE */}
          {type === "group" && (
            <>
              <FormField label="Full Name" required error={errors.name}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={updateField("name")}
                  placeholder="e.g. Jordan Lee"
                  autoComplete="name"
                  required
                />
              </FormField>

              <FormField label="Work or Personal Email" required error={errors.email}>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  placeholder="jordan@company.com"
                  autoComplete="email"
                  required
                />
              </FormField>

              <FormField label="Phone Number" helperText="Helpful for coordinator logistics">
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={updateField("phone")}
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                />
              </FormField>

              <FormField label="Group Type">
                <Select
                  name="groupType"
                  value={formData.groupType}
                  onChange={updateField("groupType")}
                >
                  <option value="Family gathering">Extended family & reunion</option>
                  <option value="Corporate / Team retreat">Corporate / Team offsite</option>
                  <option value="Celebration / Milestone">Milestone celebration (anniversary / wedding)</option>
                  <option value="School / Educational">School / University study trip</option>
                  <option value="Club / Special interest">Club / Special interest tour</option>
                  <option value="Other">Other private group</option>
                </Select>
              </FormField>

              <FormField label="Group Size">
                <Select
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={updateField("groupSize")}
                >
                  <option value="8–15 travelers">8–15 travelers</option>
                  <option value="16–30 travelers">16–30 travelers</option>
                  <option value="31–50 travelers">31–50 travelers</option>
                  <option value="50+ travelers">50+ travelers (Full charter)</option>
                </Select>
              </FormField>

              <FormField label="Desired Destination or Region">
                <Input
                  name="destination"
                  value={formData.destination}
                  onChange={updateField("destination")}
                  placeholder="e.g. Tuscany, Italy or Flexible in Europe"
                />
              </FormField>

              <FormField label="Target Travel Timing" className="sm:col-span-2">
                <Select
                  name="travelMonth"
                  value={formData.travelMonth}
                  onChange={updateField("travelMonth")}
                >
                  <option value="Flexible">Flexible dates</option>
                  <option value="Within 1 month">Within next 30 days</option>
                  <option value="1–3 months">1 to 3 months away</option>
                  <option value="3–6 months">3 to 6 months away</option>
                  <option value="6+ months">More than 6 months away</option>
                </Select>
              </FormField>

              <FormField
                label="Group Requirements & Objectives"
                helperText="Coach transport, private guide, multi-room arrangements, conference spaces."
                className="sm:col-span-2"
              >
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={updateField("message")}
                  rows={4}
                  placeholder="Describe your schedule, private meal requests, or activities required for your group."
                />
              </FormField>
            </>
          )}

          {/* INTENT: BOOKING SUPPORT */}
          {type === "booking-support" && (
            <>
              <FormField label="Traveler Name" required error={errors.name}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={updateField("name")}
                  placeholder="Name on reservation"
                  autoComplete="name"
                  required
                />
              </FormField>

              <FormField label="Account or Booking Email" required error={errors.email}>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  placeholder="email@example.com"
                  autoComplete="email"
                  required
                />
              </FormField>

              <FormField
                label="Booking Reference / Order ID"
                helperText="e.g. VV-92810 (Found on your confirmation email)"
                className="sm:col-span-2"
              >
                <Input
                  name="bookingReference"
                  value={formData.bookingReference}
                  onChange={updateField("bookingReference")}
                  placeholder="e.g. VV-XXXXX"
                />
              </FormField>

              {/* Security Warning */}
              <div className="sm:col-span-2 rounded-xl border border-amber-200 bg-amber-50/70 p-4 body5 text-amber-900">
                <div className="flex items-center gap-2 font-semibold">
                  <FiShield className="text-amber-700" aria-hidden="true" />
                  <span>Important Security Notice</span>
                </div>
                <p className="mt-1 leading-relaxed">
                  Never send payment card numbers, CVVs, or account passwords.
                  Our support desk will verify your identity using your booking reference and contact details.
                </p>
              </div>

              <FormField
                label="How can we assist with your booking?"
                helperText="Schedule changes, dietary updates, meeting point confirmations."
                className="sm:col-span-2"
              >
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={updateField("message")}
                  rows={4}
                  placeholder="Please describe the question or adjustment you require for your reservation."
                />
              </FormField>
            </>
          )}

          {/* INTENT: GENERAL QUESTION */}
          {type === "question" && (
            <>
              <FormField label="Your Name" required error={errors.name}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={updateField("name")}
                  placeholder="e.g. Sam Taylor"
                  autoComplete="name"
                  required
                />
              </FormField>

              <FormField label="Email Address" required error={errors.email}>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  placeholder="sam@example.com"
                  autoComplete="email"
                  required
                />
              </FormField>

              <FormField label="Topic" className="sm:col-span-2">
                <Select
                  name="topic"
                  value={formData.topic}
                  onChange={updateField("topic")}
                >
                  <option value="General inquiry">General inquiry</option>
                  <option value="Tour inclusions & schedules">Tour inclusions & schedules</option>
                  <option value="Destination advice">Destination advice</option>
                  <option value="Pricing & payment methods">Pricing & payment methods</option>
                  <option value="Website & accessibility feedback">Website & accessibility feedback</option>
                  <option value="Other">Other question</option>
                </Select>
              </FormField>

              <FormField
                label="Your Message"
                helperText="Share whatever details help us answer accurately."
                className="sm:col-span-2"
              >
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={updateField("message")}
                  rows={4}
                  placeholder="How can we help you?"
                />
              </FormField>
            </>
          )}

          {/* INTENT: PARTNER WITH US */}
          {type === "partner" && (
            <>
              <FormField label="Primary Contact Name" required error={errors.name}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={updateField("name")}
                  placeholder="e.g. Elena Rossi"
                  autoComplete="name"
                  required
                />
              </FormField>

              <FormField label="Business or Operator Name" required error={errors.businessName}>
                <Input
                  name="businessName"
                  value={formData.businessName}
                  onChange={updateField("businessName")}
                  placeholder="e.g. Tuscany Heritage Walks"
                  required
                />
              </FormField>

              <FormField label="Role / Organization Type">
                <Select
                  name="role"
                  value={formData.role}
                  onChange={updateField("role")}
                >
                  <option value="Local Guide / Expert">Independent Local Guide</option>
                  <option value="Tour Operator">Licensed Tour Operator</option>
                  <option value="Activity Host">Boutique Activity Host</option>
                  <option value="Travel Agency / B2B">Travel Agency / B2B Partner</option>
                  <option value="Tourism Board / DMO">Tourism Board / DMO</option>
                  <option value="Other">Other Organization</option>
                </Select>
              </FormField>

              <FormField label="Operating Region or Destination" required error={errors.destination}>
                <Input
                  name="destination"
                  value={formData.destination}
                  onChange={updateField("destination")}
                  placeholder="e.g. Florence & Chianti, Italy"
                  required
                />
              </FormField>

              <FormField label="Business Email" required error={errors.email}>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  placeholder="partner@example.com"
                  autoComplete="email"
                  required
                />
              </FormField>

              <FormField label="Phone Number" helperText="Direct coordinator contact">
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={updateField("phone")}
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                />
              </FormField>

              <FormField
                label="Experience Offerings & Partnership Vision"
                helperText="Summarize tour formats, group size limits, and certifications."
                className="sm:col-span-2"
              >
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={updateField("message")}
                  rows={4}
                  placeholder="Tell us about the experiences you operate, safety standards, and how you'd like to collaborate."
                />
              </FormField>
            </>
          )}

          {/* INTENT: REQUEST A CALL */}
          {type === "call" && (
            <>
              <FormField label="Your Full Name" required error={errors.name}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={updateField("name")}
                  placeholder="e.g. Chris Nolan"
                  autoComplete="name"
                  required
                />
              </FormField>

              <FormField label="Phone Number" required helperText="Number for our specialist to call" error={errors.phone}>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={updateField("phone")}
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                  required
                />
              </FormField>

              <FormField label="Email (for calendar invite)" helperText="Optional, receives confirmation">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  placeholder="chris@example.com"
                  autoComplete="email"
                />
              </FormField>

              <FormField label="Preferred Call Window">
                <Select
                  name="timeWindow"
                  value={formData.timeWindow}
                  onChange={updateField("timeWindow")}
                >
                  <option value="Morning (09:00 – 12:00)">Morning (09:00 – 12:00 local time)</option>
                  <option value="Afternoon (12:00 – 17:00)">Afternoon (12:00 – 17:00 local time)</option>
                  <option value="Evening (17:00 – 20:00)">Evening (17:00 – 20:00 local time)</option>
                </Select>
              </FormField>

              <FormField label="Destination of Interest (Optional)" className="sm:col-span-2">
                <Input
                  name="destination"
                  value={formData.destination}
                  onChange={updateField("destination")}
                  placeholder="e.g. Japan, Switzerland, or Multi-country"
                />
              </FormField>

              <FormField
                label="Topics to Cover on the Call"
                helperText="Route pacing, private options, budget expectations."
                className="sm:col-span-2"
              >
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={updateField("message")}
                  rows={3}
                  placeholder="Let us know what specific questions or plans you'd like to review."
                />
              </FormField>
            </>
          )}

          {/* FALLBACK FOR EXTERNAL CAMPAIGN INTENTS (deal-alert, guide-trip, dayplan, contributor) */}
          {!["trip", "group", "booking-support", "question", "partner", "call"].includes(type) && (
            <>
              <FormField label="Full Name" required={type !== "deal-alert"} error={errors.name}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={updateField("name")}
                  placeholder="e.g. Morgan Reed"
                  autoComplete="name"
                />
              </FormField>

              <FormField label="Email Address" required error={errors.email}>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  placeholder="morgan@example.com"
                  autoComplete="email"
                  required
                />
              </FormField>

              <FormField label="Reference or Region" className="sm:col-span-2">
                <Input
                  name="destination"
                  value={formData.destination}
                  onChange={updateField("destination")}
                  placeholder="Destination, guide title, or campaign topic"
                />
              </FormField>

              <FormField label="Message or Request Details" className="sm:col-span-2">
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={updateField("message")}
                  rows={4}
                  placeholder="Share any specific notes or questions."
                />
              </FormField>
            </>
          )}

          {/* PRIVACY & CONSENT CHECKBOX */}
          <div className="sm:col-span-2 pt-2">
            <Checkbox
              id="lead-consent-checkbox"
              name="consent"
              checked={formData.consent}
              onChange={updateField("consent")}
              error={errors.consent}
              label={
                <span>
                  I agree that {SITE_CONFIG.shortName} coordinators may contact me regarding this request.
                  We never share your personal data with third-party advertisers.
                </span>
              }
            />
          </div>
        </div>

        {/* SUBMIT BUTTON & REASSURANCE */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray6 pt-6 sm:flex-row">
          <div className="flex items-center gap-2 caption text-text-secondary">
            <FiShield className="text-accent shrink-0" aria-hidden="true" />
            <span>Honest advice. Direct coordinator response. Zero spam.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            disabled={loading}
            rightIcon={<FiSend aria-hidden="true" />}
            data-analytics-id="contact-form-submit"
            className="w-full sm:w-auto"
          >
            {getSubmitLabel()}
          </Button>
        </div>
      </form>
    </div>
  );
}
