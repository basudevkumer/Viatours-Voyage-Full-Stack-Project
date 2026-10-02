// TODO(api): Replace this local acknowledgement with the newsletter API call.
export async function subscribeToNewsletter(email) {
  if (!email) return { success: false, message: "Enter your email address." };
  return { success: true, message: "Thanks for your interest. Newsletter sign-up is coming soon." };
}
