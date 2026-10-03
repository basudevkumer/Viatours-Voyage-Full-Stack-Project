// TODO(api): Replace this mock with apiRequest('/leads', { method: 'POST', body: leadData }).
// TODO(server): Server-side validation, rate limiting, and bot protection are required before launch. Never rely on client checks alone.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates and submits a lead inquiry to the backend service.
 * Supports all intent types: 'trip' | 'group' | 'booking-support' | 'question' | 'partner' | 'call' | 'deal-alert' | 'guide-trip' | 'dayplan' | 'contributor' | 'private'.
 *
 * @param {Object} leadData
 * @returns {Promise<{ success: boolean, message: string, data?: Object, errors?: Array<{ field: string, message: string }> }>}
 */
export async function submitLead(leadData = {}) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 450));

  // --- Bot & Spam Protection (Client-side simulation) ---
  // Honeypot check: If the hidden honeypot field has a value, silently reject bot
  if (leadData.company_hp) {
    return {
      success: false,
      message: "Automated submission detected. Please refresh and try again.",
      errors: [{ field: "company_hp", message: "Invalid automated submission." }],
    };
  }

  // Minimum time on page check (< 1500ms is inhumanly fast)
  if (leadData.renderTime && Date.now() - Number(leadData.renderTime) < 1500) {
    return {
      success: false,
      message: "Form was submitted too quickly. Please take a moment to review your details.",
      errors: [{ field: "form", message: "Please take a moment before submitting." }],
    };
  }

  const type = String(leadData.type || "trip").trim();
  const errors = [];

  // --- Field Validation per Intent Type ---
  if (type === "call") {
    if (!leadData.name || !String(leadData.name).trim()) {
      errors.push({ field: "name", message: "Please provide your full name." });
    }
    if (!leadData.phone || !String(leadData.phone).trim()) {
      errors.push({ field: "phone", message: "Please provide a valid phone number for your call." });
    }
  } else if (type === "deal-alert") {
    if (!leadData.email || !EMAIL_REGEX.test(String(leadData.email).trim())) {
      errors.push({ field: "email", message: "Please enter a valid email address for deal alerts." });
    }
  } else {
    // Standard intents: trip, group, booking-support, question, partner, guide-trip, dayplan, contributor
    if (!leadData.name || !String(leadData.name).trim()) {
      errors.push({ field: "name", message: "Please provide your name." });
    }
    if (!leadData.email || !EMAIL_REGEX.test(String(leadData.email).trim())) {
      errors.push({ field: "email", message: "Please enter a valid email address." });
    }

    if (type === "partner") {
      if (!leadData.businessName || !String(leadData.businessName).trim()) {
        errors.push({ field: "businessName", message: "Please enter your business or operator name." });
      }
      if (!leadData.destination || !String(leadData.destination).trim()) {
        errors.push({ field: "destination", message: "Please specify your operating region or destination." });
      }
    }
  }

  if (leadData.consent === false) {
    errors.push({ field: "consent", message: "You must consent to our communication policy to submit." });
  }

  if (errors.length > 0) {
    return {
      success: false,
      message: "Please review the highlighted fields and try again.",
      errors,
    };
  }

  // --- Tailored Confirmation Messages (Calm, factual, no false promises) ---
  let confirmationMessage = "Thank you! Our travel coordinator has received your request and will review your details.";

  switch (type) {
    case "trip":
      confirmationMessage =
        "Thank you! Our destination specialist has received your trip request and will assemble a tailored itinerary outline within 1 business day.";
      break;
    case "group":
      confirmationMessage =
        "Thank you! Our group travel desk has received your details and will prepare an itemized quote and logistical outline within 1 business day.";
      break;
    case "booking-support":
      confirmationMessage =
        "Thank you! Your booking support request has been logged. Our operations desk will review your reservation file and reply via email.";
      break;
    case "question":
      confirmationMessage =
        "Thank you! Your question has been forwarded to our team. We will review your message and reply to your email.";
      break;
    case "partner":
      confirmationMessage =
        "Thank you for your interest in partnering with Viatours Voyage! Our partner onboarding team will review your application and respond with next steps.";
      break;
    case "call":
      confirmationMessage =
        "Thank you! Your phone consultation request has been received. A specialist will confirm your selected time window via email.";
      break;
    case "deal-alert":
      confirmationMessage =
        "You're subscribed! We will notify you when verified price drops or seasonal departures match your preferences.";
      break;
    case "guide-trip":
      confirmationMessage =
        "Thank you! A travel specialist will curate an itinerary based on this guide and contact you shortly.";
      break;
    case "dayplan":
      confirmationMessage =
        "Thank you! We received your day plan details. Our coordinator will verify activity timing and reach out.";
      break;
    case "contributor":
      confirmationMessage =
        "Thank you for your editorial proposal! Our travel guide team will review your pitch and reply via email.";
      break;
    default:
      confirmationMessage =
        "Thank you! Your inquiry has been received. Our team will review your details and respond shortly.";
      break;
  }

  // Sanitize and cap text properties to prevent accidental data bloat
  const cleanData = { ...leadData };
  if (cleanData.message) cleanData.message = String(cleanData.message).slice(0, 2000).trim();
  if (cleanData.notes) cleanData.notes = String(cleanData.notes).slice(0, 2000).trim();

  // Remove honeypot and internal timers before recording/returning
  delete cleanData.company_hp;
  delete cleanData.renderTime;

  return {
    success: true,
    message: confirmationMessage,
    data: {
      id: `lead_${Date.now()}`,
      receivedAt: new Date().toISOString(),
      type,
      ...cleanData,
    },
  };
}

/**
 * Backward compatibility alias for submitLead.
 */
export async function submitTripInquiry(leadData) {
  return submitLead(leadData);
}
