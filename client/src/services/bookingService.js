// TODO(api): Replace this mock with authenticated booking endpoints.
export async function getBookings() { return { success: true, message: "No bookings are available.", data: [] }; }
export async function checkAvailability() { return { success: false, message: "Availability checking is not connected yet.", errors: [] }; }
export async function createBooking(payload) { return { success: false, message: "Booking is not available yet.", errors: [], data: payload }; }
