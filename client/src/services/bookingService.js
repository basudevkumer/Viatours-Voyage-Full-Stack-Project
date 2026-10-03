// TODO(api): Replace this mock with authenticated booking endpoints: POST /bookings, GET /bookings.

export async function getBookings() {
  return { success: true, message: "No bookings are available.", data: [] };
}

export async function checkAvailability({ itemId, itemType = "tour", date, adults = 1, children = 0 }) {
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (!date) {
    return { success: false, message: "Please select a preferred departure date.", errors: ["Date is required"] };
  }

  return {
    success: true,
    message: `Dates are currently open for ${adults} adult${adults > 1 ? "s" : ""}${
      children > 0 ? ` and ${children} child${children > 1 ? "ren" : ""}` : ""
    } on ${date}.`,
    data: { available: true, itemId, itemType, date, adults, children },
  };
}

export async function createBookingRequest(payload) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!payload.date) {
    return {
      success: false,
      message: "Please choose your departure date before requesting a booking.",
      errors: ["Missing travel date"],
    };
  }

  const adults = Number(payload.adults || 1);
  const price = Number(payload.price || 0);
  const estimatedTotal = price * adults;

  return {
    success: true,
    message:
      "Thank you! Your booking request has been received. Our coordinator will verify guide availability and email your confirmation within 2 hours.",
    data: {
      bookingId: `bk_${Date.now()}`,
      status: "pending_verification",
      createdAt: new Date().toISOString(),
      estimatedTotal,
      ...payload,
    },
  };
}

export async function createBooking(payload) {
  return createBookingRequest(payload);
}
