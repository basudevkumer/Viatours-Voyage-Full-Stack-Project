// TODO(api): Replace this mock with apiRequest('/contact', { method: 'POST', body: contactData }).
import { submitLead } from "./leadService";

/**
 * Thin wrapper for backward compatibility with existing contact form callers.
 *
 * @param {Object} contactData
 * @returns {Promise<{ success: boolean, message: string, data?: Object, errors?: Array }>}
 */
export async function submitContact(contactData = {}) {
  return submitLead({
    type: contactData.subject || "question",
    ...contactData,
  });
}
