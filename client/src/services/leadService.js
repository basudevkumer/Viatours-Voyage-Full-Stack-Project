// TODO(api): Replace this mock with apiRequest('/leads', { method: 'POST', body: leadData }).
export async function submitTripInquiry(leadData) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!leadData.email || !leadData.name) {
    return {
      success: false,
      message: "Please provide your name and email address so we can reach you.",
      errors: ["Missing required fields: name or email"],
    };
  }

  return {
    success: true,
    message: "Thank you! Our travel specialist will prepare a custom proposal and reach out within 24 hours.",
    data: {
      id: `lead_${Date.now()}`,
      receivedAt: new Date().toISOString(),
      ...leadData,
    },
  };
}
