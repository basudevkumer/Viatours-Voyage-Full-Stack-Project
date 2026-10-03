// TODO(content): Confirm real business legal entity name, headquarters address, phone, and operating hours before production launch.
// All business details across About, Contact, Footer, and JSON-LD schemas must be sourced from this configuration.

export const SITE_CONFIG = Object.freeze({
  name: "Viatours Voyage",
  shortName: "Viatours",
  legalName: "Viatours Voyage Pty Ltd", // TODO(content): Verify registered corporate entity name
  url: "https://viatours.com",
  email: "hi@viatours.com", // TODO(content): Confirm primary contact email address
  phone: "1-800-453-6744", // TODO(content): Confirm toll-free customer desk phone number
  phoneDisplay: "1-800-453-6744",
  phoneTel: "+18004536744",
  address: {
    street: "328 Queensberry Street",
    city: "North Melbourne",
    state: "VIC",
    postalCode: "3051",
    country: "Australia",
    countryCode: "AU",
    formatted: "328 Queensberry Street, North Melbourne VIC 3051, Australia",
  }, // TODO(content): Confirm physical office address and registration jurisdiction
  hours: "Monday – Friday, 9:00 AM – 6:00 PM AEST", // TODO(content): Confirm true support desk hours (omit if unknown)
  responseExpectation: "Within 1 business day", // TODO(content): Confirm realistic SLA (omit if unverified)
  tagline: "A more considered way to plan a trip",
  mission:
    "We bring authentic destinations, hand-crafted tour itineraries, and small-group local experiences together so travelers can explore with total clarity, transparent pricing, and zero artificial pressure.",
  socialLinks: {
    // TODO(content): Add verified brand social accounts once published
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  },
});

