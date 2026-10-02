// TODO(api): Replace the local acknowledgement with POST /newsletter.
export async function subscribeToNewsletter(email) {
  if (!email) return { success: false, message: "Enter your email address.", errors: [{ field: "email", message: "Email is required." }] };
  return { success: true, message: "Thanks for your interest. Newsletter sign-up is coming soon.", data: null };
}
