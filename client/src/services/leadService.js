// TODO(api): Replace this mock with apiRequest('/leads', { method: 'POST', body: leadData }).

export async function submitTripInquiry(leadData) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!leadData.email || !leadData.name) {
    return {
      success: false,
      message: "Please provide your name and email address so our coordinators can reach you.",
      errors: ["Missing required fields: name or email"],
    };
  }

  const type = leadData.type || "trip";
  let confirmationMessage = "Thank you! Our travel specialist will prepare a custom proposal and reach out within 24 hours.";

  if (type === "group") {
    confirmationMessage = "Thank you! Our group travel coordinator has received your request and will assemble a tailored group proposal within 24 hours.";
  } else if (type === "call") {
    confirmationMessage = "Thank you! Your consultation request has been received. Our specialist will confirm your call slot via email.";
  } else if (type === "question") {
    confirmationMessage = "Thank you! Your inquiry has been sent to our local tour specialist. We will reply via email within 24 hours.";
  }

  return {
    success: true,
    message: confirmationMessage,
    data: {
      id: `lead_${Date.now()}`,
      receivedAt: new Date().toISOString(),
      type,
      ...leadData,
    },
  };
}

export async function submitLead(leadData) {
  return submitTripInquiry(leadData);
}
