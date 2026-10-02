// TODO(api): Replace this acknowledgement with POST /contact.
export async function submitContact(payload) { return { success: true, message: "Your message is ready to send when contact service is connected.", data: payload }; }
